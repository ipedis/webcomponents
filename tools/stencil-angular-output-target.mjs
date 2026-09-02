import { angularOutputTarget } from '@stencil/angular-output-target';

export function forwardAngularOutputs(source) {
  let forwardedOutputCount = 0;
  const segments = source.split(/(?=@ProxyCmp\(\{)/);

  const patched = segments
    .map((segment) => {
      const outputs = segment.match(/\n[ ]{2}outputs: (\[[^\n]+\]),/);

      if (!outputs || segment.includes('proxyOutputs(this, this.el,')) {
        return segment;
      }

      const nextSegment = segment.replace(
        '    this.el = r.nativeElement;\n',
        `    this.el = r.nativeElement;\n    proxyOutputs(this, this.el, ${outputs[1]});\n`,
      );

      if (nextSegment === segment) {
        throw new Error('Unable to add Angular output event forwarding.');
      }

      forwardedOutputCount += 1;
      return nextSegment;
    })
    .join('');

  if (forwardedOutputCount === 0) {
    return source;
  }

  const withImport = patched.replace(
    "import { ProxyCmp } from './angular-component-lib/utils';",
    "import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';",
  );

  if (withImport === patched) {
    throw new Error(
      'Unable to import the Angular output event forwarding helper.',
    );
  }

  return withImport;
}

/**
 * Preserve DOM event forwarding until @stencil/angular-output-target generates
 * working Angular outputs again. Version 1.4.1 declares EventEmitters but does
 * not subscribe them to the corresponding custom-element events.
 */
export function angularOutputTargetWithEventForwarding(options) {
  const target = angularOutputTarget(options);
  const generateAngularProxies = target.generator;

  target.generator = async (config, compilerCtx, buildCtx) => {
    const writeFile = compilerCtx.fs.writeFile;

    compilerCtx.fs.writeFile = (filePath, content, writeOptions) => {
      const nextContent = filePath
        .replaceAll('\\', '/')
        .endsWith('/src/directives/proxies.ts')
        ? forwardAngularOutputs(content)
        : content;

      return writeFile.call(
        compilerCtx.fs,
        filePath,
        nextContent,
        writeOptions,
      );
    };

    try {
      await generateAngularProxies(config, compilerCtx, buildCtx);
    } finally {
      compilerCtx.fs.writeFile = writeFile;
    }
  };

  return target;
}

import { Config } from '@stencil/core';

import { sass } from '@stencil/sass';

// eslint-disable-next-line @nx/enforce-module-boundaries -- shared Stencil output adapter
import { angularOutputTargetWithEventForwarding } from '../../tools/stencil-angular-output-target.mjs';

export const config: Config = {
  namespace: 'toggle',
  taskQueue: 'async',
  sourceMap: true,
  enableCache: true,

  extras: {
    enableImportInjection: true,
  },

  plugins: [sass()],

  testing: {
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  },

  outputTargets: [
    angularOutputTargetWithEventForwarding({
      componentCorePackage: 'toggle',
      directivesProxyFile: '../toggle-angular/src/directives/proxies.ts',
      valueAccessorConfigs: [],
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
      dir: 'dist/docs',
    },
    {
      type: 'www',
      serviceWorker: null,
      copy: [{ src: '**/test/*.html' }, { src: '**/test/*.css' }],
    },
    {
      type: 'dist-hydrate-script',
      dir: 'dist/hydrate',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      includeGlobalScripts: false,
    },
  ],
};

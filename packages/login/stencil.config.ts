import { Config } from '@stencil/core';

import { sass } from '@stencil/sass';

import { angularOutputTarget } from '@stencil/angular-output-target';
export const config: Config = {
  namespace: 'login',
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
    angularOutputTarget({
      componentCorePackage: 'login',
      directivesProxyFile: '../login-angular/src/directives/proxies.ts',
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
      serviceWorker: null, // disable service workers
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

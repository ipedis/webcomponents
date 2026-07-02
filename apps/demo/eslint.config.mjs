import baseConfig from '../../eslint.config.mjs';
import nx from '@nx/eslint-plugin';
import angular from 'angular-eslint';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  {
    files: ['**/*.ts'],
    // angular-eslint v22 exposes this natively (was plugin:@angular-eslint/template/process-inline-templates)
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      // Newly enabled by the angular-eslint v22 recommended set; not previously enforced.
      // The Angular v22 migration added `ChangeDetectionStrategy.Eager` to every component to
      // preserve pre-v22 behavior, which this rule flags. Kept off to match prior behavior.
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
    },
  },
  ...nx.configs['flat/angular-template'],
  // angular-eslint v22 exposes this natively (was plugin:@angular-eslint/template/accessibility)
  ...angular.configs.templateAccessibility.map((config) => ({
    ...config,
    files: ['**/*.html'],
  })),
  {
    ignores: ['**/*.spec.ts'],
  },
];

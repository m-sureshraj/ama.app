// const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    es2020: true,
  },
  plugins: ['@typescript-eslint', 'import'], // jest
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',

    // lint import/export
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',

    // Rules to lint jest tests from `eslint-plugin-jest`
    // 'plugin:jest/recommended',
    // 'plugin:jest/style',

    'plugin:prettier/recommended',
  ],
  rules: {
    'import/order': [
      ERROR,
      {
        groups: ['builtin', 'external', 'internal', 'unknown'],
        'newlines-between': 'always',
      },
    ],

    camelcase: ERROR,
    'no-prototype-builtins': WARN,
    'no-console': ERROR,

    '@typescript-eslint/no-var-requires': ERROR,
    '@typescript-eslint/ban-ts-comment': WARN,
    '@typescript-eslint/no-unused-vars': [ERROR, { args: 'after-used', argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-empty-function': ERROR,
    '@typescript-eslint/explicit-module-boundary-types': ERROR,
  },
  // enable after integrating Jest
  // overrides: [
  //   {
  //     files: ['*.spec.ts'],
  //     env: {
  //       jest: true,
  //     },
  //   },
  // ],
};

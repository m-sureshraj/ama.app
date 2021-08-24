// const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
    extends: [
        // no need to manually install. Available through create-react-app/eslint-config-react-app
        'plugin:@typescript-eslint/recommended',

        // lint import/export statements
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',

        // should be the last plugin
        'plugin:prettier/recommended',
    ],
    rules: {
        'no-console': [WARN, { allow: ['error', 'warn'] }],
        camelcase: ERROR,
        'no-prototype-builtins': WARN,

        'import/order': [
            ERROR,
            {
                groups: ['builtin', 'external', 'internal', 'unknown'],
                'newlines-between': 'always',
            },
        ],
    },
    overrides: [
        {
            files: ['**/*.ts?(x)'],
            rules: {
                '@typescript-eslint/no-var-requires': ERROR,
                '@typescript-eslint/ban-ts-comment': WARN,
                '@typescript-eslint/no-unused-vars': [
                    ERROR,
                    { args: 'after-used', argsIgnorePattern: '^_' },
                ],
                '@typescript-eslint/no-empty-function': [ERROR, { allow: ['arrowFunctions'] }],
                '@typescript-eslint/explicit-module-boundary-types': WARN,
            },
        },
    ],
};

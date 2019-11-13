module.exports = {
    root: true,
    env: {
        node: true,
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4, { 'SwitchCase': 1, 'ImportDeclaration': 'off' }],
        'comma-dangle': 'off',
        'space-before-function-paren': 'off',
        'no-return-assign': 'off',
        'template-curly-spacing': 'off',
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
            ],
            env: {
                jest: true,
            },
        },
    ],
}

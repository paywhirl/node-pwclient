module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 6,
    },
    rules: {
        indent: ['error', 4],
        'no-underscore-dangle': ['off'],
        'no-nested-ternary': ['off'],
    },
};

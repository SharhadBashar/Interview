module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 13,
  },
  globals: {
    process: 'readonly',
  },
  rules: {
    'no-extend-native': [ 'error', { exceptions: [ 'Array' ] } ],
    'no-global-assign': [ 'error', { exceptions: [ 'self' ] } ],
    'generator-star-spacing': 'off',
    // eslint-disable-next-line no-undef
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-trailing-spaces': [ 'error', { skipBlankLines: true } ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'arrow-body-style': [ 'warn', 'as-needed' ],
    'standard/no-callback-literal': 0,
    'comma-dangle': [
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'ignore',
      },
    ],
    'curly': [ 'warn', 'multi-line' ],
    'eol-last': [ 'error', 'always' ],
    'indent': [ 'error', 2, { SwitchCase: 1, VariableDeclarator: 1 } ],
    'max-len': [
      'warn',
      {
        code: 140,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreStrings: true,
        ignorePattern: '.+=".+"',
      },
    ],
    'no-multiple-empty-lines': [ 'error', { max: 1, maxEOF: 1 } ],
    'no-prototype-builtins': 0,
    'object-curly-spacing': [ 'error', 'always' ],
    'object-property-newline': [ 'error', { allowAllPropertiesOnSameLine: true } ],
    'padded-blocks': 'off',
    'prefer-const': [ 'error', { destructuring : 'all' } ],
    'prefer-template': 'error',
    'quote-props': [ 'error', 'consistent-as-needed' ],
    'quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        // TODO: Remove this rule and autofix,
        // as we don't need useless template literals
        allowTemplateLiterals: true,
      },
    ],
    'semi': [ 'error', 'never', { beforeStatementContinuationChars: 'never' } ],
    'space-before-function-paren': [ 'warn', 'always' ],
    'spaced-comment': [
      'error',
      'always',
      {
        block: {
          markers: [ '!' ],
        },
      },
    ],
  },
}

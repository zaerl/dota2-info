module.exports = {
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 8
  },
  extends: 'eslint:recommended',
  rules: {
    'no-console': 0,
    'no-empty': 0,
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true
      }
    ],
    semi: [
      'error',
      'always'
    ],
    'no-unused-vars': [
      2, {
        args: 'none'
      }
    ],
    indent: [
      2,
      2,
      {
        SwitchCase: 1
      }
    ]
  }
};

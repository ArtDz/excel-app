module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'semi': 'off',
    'comma-dangle': 'off',
    'require-jsdoc': 'off',
    'arrow-parens': 'off',
    'operator-linebreak': 'off',
    'no-trailing-spaces': 'off',
    'max-len': 'off',
    'no-unused-vars': 'off',
    'no-case-declarations': 'off',
    'padded-blocks': 'off'
  }
};

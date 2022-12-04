module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  plugins: [
    'jsdoc',
  ],
  extends: [
    'airbnb-base',
    'plugin:jsdoc/recommended',
  ],
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'no-nested-ternary': 'off',
  },
};

'use strict';

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs'
    },
    rules: {
      'no-undef': 'off'
    }
  },
  {
    ignores: ['public', 'themes', '.husky']
  }
];

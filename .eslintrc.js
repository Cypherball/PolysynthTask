module.exports = {
  root: true,
  extends: ['prettier', 'plugin:react/recommended', 'eslint:recommended'],
  plugins: ['react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // disabling some rules to suit my code style
    semi: 0,
    'comma-dangle': 0,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 0,
    'react-native/sort-styles': 0,
    'react-hooks/exhaustive-deps': 0,
    'multiline-ternary': 0,
    'react-native/no-raw-text': 0,
  },
}

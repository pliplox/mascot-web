module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  extends: ['airbnb', 'plugin:import/recommended', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
    rules: {
      strict: 'off'
    }
  },
  plugins: ['prettier', 'material-ui', 'react-hooks'],
  rules: {
    eqeqeq: 'error',
    'import/no-extraneous-dependencies': 'off',
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
    'react/jsx-props-no-spreading': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};

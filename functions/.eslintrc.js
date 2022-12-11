module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      // your babel options
      presets: ["@babel/preset-env"],
    },
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    quotes: ["error", "double"],
  },
};

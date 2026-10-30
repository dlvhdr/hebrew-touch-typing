module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-typescript', {onlyRemoveTypeImports: false}],
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};

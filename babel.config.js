module.exports = {
  presets: [
    [
      // doc: https://babeljs.io/docs/en/babel-preset-env
      '@babel/preset-env',
      {
        loose: true,
        // Only parse modules if testing. If not, let webpack handle it
        modules: false,
        // set to true to see which polyfill is added to each file
        debug: false,
        forceAllTransforms: true,
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
        // exclude any polyfill you don't need
        exclude: [
          'es.string.anchor',
          'es.regexp.*',
          'es.array.concat',
          'es.array.filter',
          'es.array.for-each',
          'es.array.index-of',
          'es.array.join',
          'es.array.map',
          'es.array.reduce',
          'es.array.splice',
          'es.array.some',
          'es.array.slice',
          'es.object.keys',
          'es.object.freeze',
          'es.date.to-string',
          'es.object.to-string',
          'es.string.split',
          'es.string.replace',
        ],
      },
    ],
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import'],
};

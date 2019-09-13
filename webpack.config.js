const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  entry: {
    bundle: ['./src/main.js'],
  },
  resolve: {
    alias: {
      svelte: resolve('node_modules', 'svelte'),
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
  },
  module: {
    rules: [
      // transpile js svelte helpers
      {
        test: /\.m?js$/,
        include: [/svelte/],
        use: ['babel-loader'],
      },
      // transpile svelte compiled templates
      {
        test: /\.svelte$/,
        use: [
          'babel-loader',
          {
            loader: 'svelte-loader',
            options: {
              emitCss: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  devtool: prod ? false : 'source-map',
  optimization: {
    // create a separate chunk for webpack runtime
    runtimeChunk: { name: 'runtime' },
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      minChunks: 1,
      automaticNameDelimiter: '_',
      cacheGroups: {
        vendors: false,
        // node_modules thingies go to 'lib'
        libs: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        // Chunk that contains used polyfills
        polyfills: {
          test: /core-js/,
          name: 'polyfills',
          priority: 10,
        },
      },
    },
  },
};

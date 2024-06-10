const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DynamicCodeSplitPlugin = require('./DynamicCodeSplitPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js', // bundle filename
    path: path.resolve(__dirname, 'dist-new-webpack'),
    publicPath: '/',
  },
  mode: 'production',
  cache: {
    type: 'filesystem', // Enable persistent caching
    cacheDirectory: path.resolve(__dirname, '.webpack_cache'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            drop_console: true,
            passes: 2,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: false, 
    runtimeChunk: false, 
  },
  plugins: [
    new DynamicCodeSplitPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'report.html',
      openAnalyzer: true,
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};

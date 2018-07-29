/* eslint-disable */
const withSass = require('@zeit/next-sass');
const ExtractTextPlugin = require('../../../../.cache/typescript/2.9/node_modules/@types/extract-text-webpack-plugin');
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config');

module.exports = withSass({
  cssModules: true,
  webpack(config, options) {
    const { isServer } = options;

    config.module.rules.push({
      test: /\.css$/,
      include: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: [
          {
            loader: 'style-loader',
          },
        ],
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      }),
    });

    const extractGlobalCSSPlugin = new ExtractTextPlugin({
      filename: 'static/vendor.css'
    });
    config.plugins.push(extractGlobalCSSPlugin);
    options.extractGlobalCSSPlugin = extractGlobalCSSPlugin;
    config = commonsChunkConfig(config);
    if (!isServer) {
    }

    return config;
  }
});

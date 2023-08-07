/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  output: {
    pathinfo: true
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@test': path.resolve(__dirname, './test')
    },
    /**
     * Polyfill Node.js util module which is used by sinon
     *
     * @see https://stackoverflow.com/a/64580815
     */
    fallback: {
      util: require.resolve('util/')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        RUN_ENV: JSON.stringify(process.env.RUN_ENV)
      }
    })
  ],
  module: {
    rules: [
      {
        test: [/\.tsx?$/, /\.jsx?$/],
        use: ['babel-loader?babelrc'],
        exclude: /node_modules/
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS,
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  }
};

if (process.env.REACT === '16') {
  module.exports.resolve.alias = {
    ...module.exports.resolve.alias,
    react: 'react-16',
    'react-dom': 'react-dom-16'
  };
}

if (process.env.REACT === '18') {
  module.exports.resolve.alias = {
    ...module.exports.resolve.alias,
    react: 'react-18',
    'react-dom': 'react-dom-18',
    '@testing-library/react': '@testing-library/react-13'
  };
}

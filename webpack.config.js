const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')


module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'
  const isDev = !isProd

  console.log('Production mode', isProd)
  console.log('Development mode', isDev)

  const filename = (ext) =>
      isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`

  const plugins = () => {
    const base = [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'favicon.png'),
            to: path.resolve(__dirname, 'dist')
          }
        ],
      }),
      // new FaviconsWebpackPlugin({
      //     logo: './favicon.png',
      //     prefix: isProd ? 'assets/' : '',
      // }),
      new MiniCssExtractPlugin({
        filename: filename('css')
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode),
      })
    ]

    if (isDev) {
      base.push(new ESLintPlugin())
    }

    return base
  }

  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        './index.js'
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: filename('js'),
      clean: true
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src/core'),
      }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
      port: 5500,
      open: true,
      hot: true,
      watchFiles: './'
    },
    plugins: plugins(),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
  }
}

// {
// // Вместо file-loader
// // Позволяет в коде получать путь к файлу ресурса:
// // import avatar from './assets/images/avatar.png'
//     test: /\.(png|jpg|gif)$/i,
//         type: 'asset/resource'
// },
// {
// // Вместо raw-loader
// // Позволяет в коде получать содержимое файла ресурса.
// // import license from './assets/text/license.txt'
//     test: /\.(txt)$/i,
//         type: 'asset/source'
// },
// {
// // Для тех, кто предпочитает формату JSON более компактный формат YAML:
// // import config from './assets/settings/config.yml'
//     test: /\.ya?ml$/i,
//         type: 'json',
//     use: 'yaml-loader'
// }

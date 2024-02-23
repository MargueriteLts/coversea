const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js',
    page: './src/page.jsx',
    generatorfun: './src/generator-fun.jsx'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs')
    // clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    // Landing page
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index']
    }),

    // Internal pages
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/About.html',
      filename: './pages/About.html',
      chunks: ['page']
    }),

    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/pages/Contact.html',
      filename: './pages/Contact.html',
      chunks: ['page']
    }),

    // Generators

    //abstract
    // new HtmlWebpackPlugin({
    //   hash: true,
    //   scriptLoading: 'blocking',
    //   template: './src/pages/generators/generator-abstract.html',
    //   filename: './pages/generators/generator-abstract.html',
    //   // chunks: ['page']
    // }),

    // //acid
    // new HtmlWebpackPlugin({
    //   hash: true,
    //   scriptLoading: 'blocking',
    //   template: './src/pages/generators/generator-acid.html',
    //   filename: './pages/generators/generator-acid.html',
    //   // chunks: ['page']
    // }),

    //digital
    // new HtmlWebpackPlugin({
    //   hash: true,
    //   scriptLoading: 'blocking',
    //   template: './src/pages/generators/generator-digital.html',
    //   filename: './pages/generators/generator-digital.html',
    //   // chunks: ['page']
    // }),

    //fun
    new HtmlWebpackPlugin({
      hash: true,
      scriptLoading: 'blocking',
      template: './src/generators/generator-fun.html',
      filename: './generators/generator-fun.html',
      chunks: ['generatorfun']
    }),

    //minimalist
    // new HtmlWebpackPlugin({
    //   hash: true,
    //   scriptLoading: 'blocking',
    //   template: './src/pages/generators/generator-minimalist.html',
    //   filename: './pages/generators/generator-minimalist.html',
    //   // chunks: ['page']
    // }),

    // Partials
    // new HtmlWebpackPartialsPlugin([
    //   {
    //     path: path.join(__dirname, './src/partials/analytics.html'),
    //     location: 'analytics',
    //     template_filename: '*',
    //     priority: 'replace'
    //   }
    // ])
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
}

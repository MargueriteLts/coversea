const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js',
    generator: './src/generator.jsx',
    teasergenerator: './src/teaserGenerator.jsx',
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
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      // },
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
      chunks: ['teasergenerator']
    }),

    // Internal pages
    
    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/socials.html',
    //  filename: './socials.html',
    //  chunks: ['index']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/landing.html',
    //  filename: './landing.html',
    //  chunks: ['index']
    //}),
    
    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/about.html',
    //  filename: './about.html',
    //  chunks: ['index']
    //}),
    
    // Generators
    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator1.html',
    //  filename: './generators/generator1.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator1_2.html',
    //  filename: './generators/generator1_2.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator1_3.html',
    //  filename: './generators/generator1_3.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator2.html',
    //  filename: './generators/generator2.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator2_2.html',
    //  filename: './generators/generator2_2.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator2_3.html',
    //  filename: './generators/generator2_3.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator3.html',
    //  filename: './generators/generator3.html',
    //  chunks: ['generator']
    //}),
    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator3_2.html',
    //  filename: './generators/generator3_2.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator4.html',
    //  filename: './generators/generator4.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator4_2.html',
    //  filename: './generators/generator4_2.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator4_3.html',
    //  filename: './generators/generator4_3.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator4_4.html',
    //  filename: './generators/generator4_4.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator4_5.html',
    //  filename: './generators/generator4_5.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator5.html',
    //  filename: './generators/generator5.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator5_2.html',
    //  filename: './generators/generator5_2.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator6.html',
    //  filename: './generators/generator6.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator6_2.html',
    //  filename: './generators/generator6_2.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator7.html',
    //  filename: './generators/generator7.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator7_2.html',
    //  filename: './generators/generator7_2.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator7_3.html',
    //  filename: './generators/generator7_3.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator8.html',
    //  filename: './generators/generator8.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator8_2.html',
    //  filename: './generators/generator8_2.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator8_3.html',
    //  filename: './generators/generator8_3.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator9.html',
    //  filename: './generators/generator9.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator9_2.html',
    //  filename: './generators/generator9_2.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator9_3.html',
    //  filename: './generators/generator9_3.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator10.html',
    //  filename: './generators/generator10.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator10_2.html',
    //  filename: './generators/generator10_2.html',
    //  chunks: ['generator']
    //}),

    //new HtmlWebpackPlugin({
    //  hash: true,
    //  scriptLoading: 'blocking',
    //  template: './src/generators/generator10_3.html',
    //  filename: './generators/generator10_3.html',
    //  chunks: ['generator']
    //}),

    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/analytics.html'),
        location: 'analytics',
        template_filename: '*',
        priority: 'replace'
      }
    ])
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
}

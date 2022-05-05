
const envPath = require.resolve(`./.env.${process.env.APP_ENV}`)
require('dotenv').config({ path: envPath })

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const ESLintPlugin = require('eslint-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const fs = require('fs')
const resolve = dir => require('path').join(__dirname, dir)
const isDev = process.env.APP_ENV === 'development'

const entry = (() => {
  const entry = {}
  fs.readdirSync('./src/entry').map(name => entry[name] = resolve(`./src/entry/${name}`))
  return entry
})()

const rules = [
  {
    test: /\.css$/,
    use: [
      isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: isDev ? 0 : 1,
        },
      },
      isDev ? false : 'postcss-loader',
    ].filter(Boolean),
  },
  {
    test: /\.less$/,
    use: [
      isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: isDev ? 1 : 2,
        },
      },
      isDev ? false : 'postcss-loader',
      {
        loader: 'less-loader',
        options: {
          additionalData: '@import "@/style/var-less.less";',
        }
      }
    ].filter(Boolean),
  },
  {
    test: /\.scss$/,
    use: [
      isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: isDev ? 1 : 2,
        },
      },
      isDev ? false : 'postcss-loader',
      'sass-loader',
    ].filter(Boolean),
  },
  {
    test: /\.vue$/,
    use: 'vue-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.js$/,
    use: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.tsx?$/,
    use: [
      'babel-loader',
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: ['\\.vue$'],
        },
      },
    ],
  },
  {
    test: /\.(png|gif|jpg|jpeg|svg|bmp|webp|ttf|otf|woff|woff2|eot)$/,
    type: 'asset/resource',
  }
]

const plugins = [
  new webpack.ProgressPlugin(),
  ...Object.keys(entry).map(name => new HtmlWebpackPlugin({
      chunks: [name],
      filename: `${name}.html`,
      template: resolve('./public/index.html'),
      favicon: resolve('./public/favicon.ico'),
    })
  ),
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
    'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
  }),
  new Dotenv({ path: envPath }),
  new StyleLintPlugin({
    files: ['**/*.{vue,html,css,less,scss,sass}'],
    context: resolve('../src'),
    emitError: true,
    emitWarning: true,
    failOnError: !isDev,
    failOnWarning: !isDev,
  }),
  new ESLintPlugin({
    extensions: ['ts', 'tsx', 'js', 'vue'],
    context: resolve('../src'),
    failOnError: !isDev,
    failOnWarning: !isDev,
  }),
  // new BundleAnalyzerPlugin(),
].concat(isDev ? [

] : [
  new MiniCssExtractPlugin({
    filename: '[name]/[contenthash].css',
    chunkFilename: '[name]/[contenthash].css',
  })
])

const devServer = {
  host: '0.0.0.0',
  historyApiFallback: true,
  open: Object.keys(entry).map(i => `/${i}.html`), // 打开所有入口
  compress: false,
  client: {
    logging: 'warn',
    overlay: false,
    progress: false,
  },
  // proxy: {
  //   '/api': {
  //     target: '',
  //     changeOrigin: true,
  //     secure: false,
  //   },
  // },
}



module.exports = {
  entry,
  target: 'web',
  devtool: isDev && 'eval-cheap-module-source-map',
  output: {
    clean: true,
    path: resolve('./dist'),
    filename: `[name]/${isDev ? '[name]' : '[fullhash]'}.js`,
    chunkFilename: `[name]/${isDev ? 'chunk.[name]' : '[contenthash]'}.js`,
    assetModuleFilename: '[name]/[hash][ext][query]',
    publicPath: '/',
  },
  devServer,
  mode: isDev ? 'development' : 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': resolve('./src'),
    },
  },
  module: {
    rules,
  },
  plugins,
  experiments: {
    topLevelAwait: true,
  },
  stats: 'errors-warnings',
  performance: {
    hints: false,
  },
}

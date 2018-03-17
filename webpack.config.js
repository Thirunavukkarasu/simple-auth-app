const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test:/\.css$/, use:['style-loader','css-loader'] }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"]
  },
  plugins: [ 
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      { from: './client/assets' }
    ])
  ],
  devServer: {
    hot: true,
    stats: {
      colors: true,
      chunks: false
    },
    proxy: {
      '/api/*': {
        target: 'http://localhost:4000',
        proxyTimeout: 3000
      }
    },    
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    historyApiFallback: {
      index: 'http://localhost:8080/'
    }    
  },
  devtool: 'eval'  
}
const webpack = require('webpack')
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map', // Faster source maps for development
  cache: true, // Enable caching for faster rebuilds
  
  devServer: {
    port: 3000,
    open: true,
    compress: true,
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: true, // Show errors as overlay
      progress: true // Show build progress
    },
    static: {
      watch: true
    }
  },

  watchOptions: {
    poll: 1000, // Reduce polling frequency
    ignored: ['/node_modules/', '/dist/'], // Ignore watching unnecessary folders
    aggregateTimeout: 300 // Add delay before rebuilding
  },

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },

  plugins: [
    // new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('WHP'),
    }),
  ],
}
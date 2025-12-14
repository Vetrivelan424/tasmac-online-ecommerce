const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { DefinePlugin } = require('webpack');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: 'production',
  entry:'./src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'), // Ensure this points to the correct folder.
    filename: '[name].[contenthash].js',
    clean: true,
    chunkFilename: '[name].[contenthash:8].chunk.js',
    // publicPath: 'dist/', // Use '/' or leave it empty if dist is at the root
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Removes console.log, console.warn, and console.error
          },
        },
      }),
    ],
    chunkIds:'deterministic',
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      // removeAvailableModules: true,
      // removeEmptyChunks: false,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          priority: -10,
          reuseExistingChunk: true,
        },
        
      },
    },
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    }
  }, 
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      // chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    // new DefinePlugin({
    //   // 'process.env.NODE_ENV': JSON.stringify('production'),
    // }),
    
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, // 20 MB
    }),
    // new PreloadWebpackPlugin({
    //   rel: 'preload',
    //   include: 'allAssets',
    //   fileBlacklist: [/\.map$/, /hot-update\.js$/],
    // }),
    // Uncomment the following line to enable bundle analysis
    // new BundleAnalyzerPlugin(),
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env',
                  'cssnano',
                ],
              },
            },
          },
        ],
      },
      
    ],
  },
  externals: {
    // Exclude node_modules from being bundled.
    'remapping': '@ampproject/remapping'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.mjs','.cjs'],
   
  },
  stats: {
    children: true
},

};
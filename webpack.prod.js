const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const ClosurePlugin = require('closure-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = merge(common, {
  mode: 'production',
  plugins: [
		new WorkboxPlugin.GenerateSW({
			// these 2 options encourage the ServiceWorkers to get in there fast
			// and not allow any straggling "old" SWs to hang around
			clientsClaim: true,
			skipWaiting: true,
			cleanupOutdatedCaches: true,
			inlineWorkboxRuntime: false,
    }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      // new UglifyJsPlugin(),
      // new ClosurePlugin({mode: 'STANDARD'}, {})
    ],
  }
});
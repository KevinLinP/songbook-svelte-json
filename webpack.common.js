// this config assumes the host is doing the minifying

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		main: ['./src/main.js']
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].[hash].js',
		chunkFilename: '[name].[contenthash].js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['ifdef-loader']
			},
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: !prod,
					}
				}
			},
			{
				test: /\.css$/i,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader',
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader', // Run postcss actions
						options: {
							plugins: function () { // postcss plugins, can be exported to postcss.config.js
								return [
									require('autoprefixer')
								];
							}
						}
					},
					{
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          },
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader',
				],
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyPlugin({
      patterns: [
				'static'
      ],
    }),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			filename: '[name].[hash].css',
		}),
	],
	optimization: {
		moduleIds: 'hashed',
		splitChunks: {
			chunks: 'all',
		},
	},
};
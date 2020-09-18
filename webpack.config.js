const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		app: './src/index.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true
	},
	plugins: [
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new HtmlWebpackPlugin({
			title: 'three.js',
		}),
	],
	module: {
		rules: [

			// Loading CSS
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
			},

			// Loading Images
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader',
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				loader: 'image-webpack-loader',
				options: {
					bypassOnDebug: true, // webpack@1.x
					disable: true, // webpack@2.x and newer
				},
			},

			// Loading Fonts
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader',
				],
			},

			// Loading Data
			{
				test: /\.(csv|tsv)$/,
				use: [
					'csv-loader',
				],
			},
			{
				test: /\.xml$/,
				use: [
					'xml-loader',
				],
			}

		],
	},
};
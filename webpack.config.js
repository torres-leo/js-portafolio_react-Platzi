const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		// Punto de salida va a buscar dentro del mismo directorio, la carpeta 'dist'
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
	},
	resolve: {
		extensions: ['.js'],
	},
	module: {
		rules: [
			// Interpretando babel para que los navegadores desactualizados logren entender codigo JS
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			// configuracion de loader css y stylus
			{
				test: /\.css|\.styl$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
			},
			// loader para mover las imagenes. Este aplica un hash al nombre
			{
				test: /\.png/,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: './public/index.html',
			filename: './index.html',
		}),
		// Minimizando css en la carpeta "dist"
		new MiniCssExtractPlugin(),

		// Moviendo la carpeta assets/images a "dist"
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src', 'assets/images'),
					to: 'assets/images',
				},
			],
		}),
	],
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotevn = require('dotenv-webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		// Punto de salida va a buscar dentro del mismo directorio, la carpeta 'dist'
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		assetModuleFilename: 'assets/images/[hash][ext][query]',
	},
	mode: 'development',
	watch: true,
	resolve: {
		extensions: ['.js'],
		alias: {
			'@utils': path.resolve(__dirname, 'src/utils/'),
			'@templates': path.resolve(__dirname, 'src/templates/'),
			'@styles': path.resolve(__dirname, 'src/styles/'),
			'@images': path.resolve(__dirname, 'src/assets/images/'),
		},
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
			// Configuración para "fonts"
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[hash][ext]',
				},
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
		new MiniCssExtractPlugin({
			filename: 'assets/[name].[contenthash].css',
		}),

		// Moviendo la carpeta assets/images a "dist"
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src', 'assets/images'),
					to: 'assets/images',
				},
			],
		}),
		new Dotevn(),
	],
};

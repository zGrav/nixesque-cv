const path = require('path');
const webpack = require('webpack');
const { InjectorWebpackConfig } = require('@bitchcraft/injector');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const config = {
	context: path.resolve(__dirname),
	entry: {
		app: [
			'./client/index.js',
		],
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		chunkFilename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.IgnorePlugin(/jsdom$/),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
			}
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				handlebarsLoader: {}
			},
		}),
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				use: [
					{
					loader: 'thread-loader',
					options: {
							workers: 4,
							workerParallelJobs: 50,
							workerNodeArgs: ['--max-old-space-size=4096'],
							poolTimeout: 2000,
							poolParallelJobs: 50,
							name: "threadloaderpool"
						}
					}, {
					loader: 'babel-loader',
					query: {
						cacheDirectory: true,
						babelrc: true,
						plugins: [],
					},
				}],
			}, {
				test: /\.(ttf|eot|svg|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
					loader: 'thread-loader',
					options: {
							workers: 4,
							workerParallelJobs: 50,
							workerNodeArgs: ['--max-old-space-size=4096'],
							poolTimeout: 2000,
							poolParallelJobs: 50,
							name: "threadloaderpool"
						}
					}, 'cache-loader', 'url-loader?limit=50000']
			}, {
				test: /\.(otf|eot|png|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [
					{
					loader: 'thread-loader',
					options: {
							workers: 4,
							workerParallelJobs: 50,
							workerNodeArgs: ['--max-old-space-size=4096'],
							poolTimeout: 2000,
							poolParallelJobs: 50,
							name: "threadloaderpool"
						}
					}, 'cache-loader', 'url-loader?limit=8192']
			}
		].concat(InjectorWebpackConfig.rules),
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.json' ],
	},
	resolveLoader: {
		modules: [ 'node_modules', InjectorWebpackConfig.resolveLoader.modules[0] ],
	},
}

config.mode = process.env.NODE_ENV;

if (process.env.NODE_ENV === 'development') {
	config.devtool = 'cheap-module-eval-source-map';//'inline-source-map';
	config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
	config.entry['app'].unshift('eventsource-polyfill', 'webpack-hot-middleware/client');

	config.module.rules[0].use[1].query.plugins.push([
		'react-transform', {
			transforms: [{
				transform: 'react-transform-hmr',
				imports: ['react'],
				locals: ['module']
			}],
		},
	]);

} else if (process.env.NODE_ENV === 'production') {
	// uglify
	config.optimization = {
		minimizer: [ new UglifyJsPlugin({ cache: true }) ]
	};
}

module.exports = config;

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let devFlagPlugin = new webpack.DefinePlugin({
   __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');
const PROD_BUILD_DIR = path.resolve(__dirname, 'public');

module.exports = {
    // be able to debug with the source code
    devtool: 'source-map',
    entry: [
        APP_DIR + '/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: BUILD_DIR,
        publicPath: PROD_BUILD_DIR
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('app.css'),
        // generate the index.html
        new HtmlWebpackPlugin({ title: 'train-monitor' }),
        devFlagPlugin
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot-loader', 'babel-loader'],
                include: APP_DIR
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader!css-loader')
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        contentBase: BUILD_DIR, // APP_DIR not work at this time unless the generated index.html is added into the dir
        compress: false,
        port: 9000,
        inline: false // no need when HotModuleReplacement is used
    }
};

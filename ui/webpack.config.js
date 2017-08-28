let resolve = require('path').resolve;
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = resolve(__dirname, 'dist');
const PUBLIC_PATH = resolve(__dirname, '/');
const SRC_DIR = resolve(__dirname, 'src');

const __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = {
    // be able to debug with the source code
    devtool: 'source-map',
    entry: SRC_DIR + '/index.js',
    output: {
        filename: 'bundle.js',
        path: BUILD_DIR,
        publicPath: PUBLIC_PATH
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: 'bundle.css',
            allChunks: true
        }),
        // generate the index.html
        new HtmlWebpackPlugin({
            title: 'train-monitor',
            template: SRC_DIR + '/index.ejs'
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['react-hot-loader', 'babel-loader'],
                include: SRC_DIR
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // more config of css-loader: https://github.com/webpack-contrib/css-loader
                    // more info about React CSS Module: https://javascriptplayground.com/blog/2016/07/css-modules-webpack-react/
                    // TODO: load the 3rd party css lib as module
                    use: 'css-loader'
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', 'css']
    },
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        contentBase: BUILD_DIR,
        compress: false,
        port: 9000,
        inline: false // no need when HotModuleReplacement is used
    }
};

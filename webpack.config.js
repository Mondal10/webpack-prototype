const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const assetSrc = path.resolve(__dirname, 'src/');
const isDevEnv = process.env.NODE_ENV === 'development';

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {[process.env.FOLDER_NAME]: `./src/templates/${process.env.FOLDER_NAME}/js/Controller.js`},
    output: {
        filename: 'bundle.js',
        chunkFilename: 'chunks/chunk_[name].bundle.js',
        path: __dirname + '/dist/' + process.env.FOLDER_NAME
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif|mp3)$/i,
                include: assetSrc,
                loaders: ['file-loader']
            },
            // {
            //     test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //     include: assetSrc,
            //     loader: 'file-loader'
            // }
        ]
    },
    "devtool": isDevEnv ? "source-map" : "",
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        })
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // }),
        // new CopyWebpackPlugin([
        //     {
        //         from: 'src/global/config',
        //         to: 'config'
        //     },
        //     {
        //         from: 'src/courses',
        //         to: 'courses'
        //     }
        // ], {
        //     debug: true
        // })
    ]
};
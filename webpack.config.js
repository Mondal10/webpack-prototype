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
                test: /\.(jpe?g|png|gif|svg)$/i,
                include: assetSrc,
                loaders: 'file-loader',
                options: {
                    outputPath: 'images',
                }
            },
            {
                test: /\.(woff2|ttf|eot|)$/i,
                include: assetSrc,
                loaders: 'file-loader',
                options: {
                    outputPath: 'fonts',
                }
            },
        ]
    },
    // devServer: {
    //   compress: true,
    //   disableHostCheck: true,   // This solves browserstack issue
    // },
    "devtool": isDevEnv ? "source-map" : "",
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //       {
        //         from: `src/templates/${process.env.FOLDER_NAME}/data`,
        //         to: 'data'
        //       },
        //       {
        //         from: `src/templates/${process.env.FOLDER_NAME}/audio`,
        //         to: 'audio'
        //       },
        //       {
        //         from: 'src/global/audio',
        //         to: 'audio'
        //       },
        //       {
        //         from: 'src/global/data',
        //         to: 'data'
        //       }
        //     ],
        //   }, {
        //     debug: true
        // }),
    ]
};
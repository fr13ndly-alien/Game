var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports =
{
    entry:
    [
        // 'babel-polyfill',
        './src/core/Main.js',
    ],
    output:
    {
        path: __dirname + '/.release',
        filename: './js/main.js',
        publicPath: '/'
    },
    module:
    {
        loaders:
        [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:
                {
                    presets: ['es2015', 'es2015-node5', 'stage-0'],
                    plugins: []
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins:
    [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin(
        {
            template: 'index.html',
            inject: 'body',
        })
    ],
    resolveLoader:
    {
        modules: [process.env.NODE_PATH, path.resolve('./node_modules')],
    },
    resolve:
    {
        modules: [process.env.NODE_PATH, path.resolve('./node_modules')],
    }
}
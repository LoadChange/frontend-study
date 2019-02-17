const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const isDev = process.env.NODE_ENV !== 'production'

const entryNames = ['enterprise']
const entry = {}
const htmlPlugins = []
for (const name of entryNames) {
    entry[name] = `./src/${name}/index.js`
    htmlPlugins.push(new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: `./src/${name}/${name}.html`,
        minify: !isDev
    }))
}

module.exports = {
    entry,
    output: {
        filename: './[name]/js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        }, {
            test: /\.(js|jsx)$/,
            use: ['babel-loader']
        }, {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: '/images/[name].[hash:8].[ext]',
            },
        },]
    },
    plugins: [
        ...htmlPlugins
    ]
};

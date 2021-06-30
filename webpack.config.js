/*
 * @Date: 2021-06-30 16:10:22
 * @LastEditors: cunhang_wwei
 * @LastEditTime: 2021-06-30 16:21:12
 * @Description: 搭建本地构建环境
 */
const path = require('path');

module.exports = {
    mode: 'development',

    entry: './src/index.js',
    
    output: {
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: path.join(__dirname, "page"),
        publicPath: '/',
        compress: false,
        port: 9000,
        hot: true,
        open: true
    },

    devtool: 'source-map'
}
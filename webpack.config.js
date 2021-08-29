const path = require('path');

module.exports = {
    entry: './src/VirtulDom/index.js',
    output: {
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "www"),
        compress: false,
        port: 8081,
        publicPath: '/neil/'
    }
}
const path = require('path');
const base = require('./webpack.base.conf')

module.exports = Object.assign({}, base, {
    devServer: {
        port: 8881
    },
    mode: 'development'
})

const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../public'),
    devServer: {
        proxy: process.env.PRODUCTION ? 'https://pgnote-api.herokuapp.com/' : 'http://localhost:5000/'
    }
}
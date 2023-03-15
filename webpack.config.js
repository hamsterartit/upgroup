const mode = require('./gulpfile');
const path = require('path');
const outputDir = path.resolve(__dirname, 'dist');
module.exports = {
    context: __dirname + '/src/js',
    output: {
        path: outputDir + '/js',
        filename: 'script.js'
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: require.resolve("babel-loader"),
                options: {
                    presets: [
                        ["@babel/preset-env", { modules: false }]
                    ]
                }
            }
        }]
    },
    mode: mode.prod ? "production" : "development",
};

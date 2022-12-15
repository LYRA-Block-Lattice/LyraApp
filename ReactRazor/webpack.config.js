var glob = require('glob');
const path = require("path");
const fs = require("fs");

module.exports = {
    entry: './src/index.js',
    devtool: "source-map",
    mode: "development",
    output: {
        filename: "rbapp.js",
        path: path.resolve(__dirname, "./wwwroot/scripts"),
        library: "bruic",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
}
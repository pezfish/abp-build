const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: { index: path.resolve("./src", "index.js") },
  output: {
    path: path.resolve("./dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve("./src", "index.html"),
    }),
  ],
  devServer: {
    contentBase: path.resolve("../src"),
    hot: true,
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          "eslint-loader",
        ],
      },
    ],
  },
};

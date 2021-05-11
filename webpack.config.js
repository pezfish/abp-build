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
        test: /\.s[ac]ss$/i,
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
        use: ["babel-loader", "eslint-loader"],
      },
    ],
  },
};

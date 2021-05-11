#!/bin/env node

process.env.NODE_ENV = "production";

console.log("BUILDING...");

const webpack = require("webpack");
const config = require("../webpack.config");

webpack(config).run((err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details.join("\n\n"));
    }
    return;
  }

  console.log(
    stats.toString({
      chunks: true,
      colors: true,
      children: true,
    })
  );

  // if (stats.hasErrors()) {
  //   console.log("test");
  //   console.error(info.errors.join("\n\n"));
  // }

  // if (stats.hasWarnings()) {
  //   console.log("test2");
  //   console.warn(info.warnings.join("\n\n"));
  // }
});

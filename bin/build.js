#!/bin/env node

const { pathToFileURL } = require("url");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const webpack = require("webpack");

const argv = yargs(hideBin(process.argv)).argv;

process.env.NODE_ENV = "production";

console.log("BUILDING...");

const resolveConfig = async (passedConfig) => {
  let config;

  if (passedConfig) {
    config = await import(pathToFileURL(passedConfig));
  } else {
    config = require("../webpack.config");
  }

  return config;
};

const config = resolveConfig(argv.config);

console.log(config);

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

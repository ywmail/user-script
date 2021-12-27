/* eslint-disable no-console */
const helper = require("./helper");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const baseConfigs = require("./webpack.base")().chainConfigs;

module.exports = function () {
  const nodeEnv = process.argv[process.argv.length - 1];
  const components = helper.normalizeComponent(nodeEnv);
  const results = [];

  baseConfigs.forEach((config, index) => {
    const filePath = helper.getComponentFilePath(components[index]); // example/yang-test/hello-world
    const comment = getComment(helper.resolve("src", filePath, "./comment.js"));
    config.mode("production");
    config.optimization.minimizer("terser-plugin").use(TerserPlugin, [
      {
        terserOptions: {
          format: {
            comments: /(^\s*==)|(^\s*@)/i,
          },
        },
      },
    ]);
    config.optimization.minimizer("banner-plugin").use(webpack.BannerPlugin, [
      {
        banner: comment + "\n",
        raw: true,
      },
    ]);

    // toConfig
    results.push(config.toConfig());
  });

  return results;
};

function getComment(filePath) {
  const fs = require("fs");

  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error(err);
  }
}

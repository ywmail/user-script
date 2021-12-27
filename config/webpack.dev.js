const baseConfigs = require("./webpack.base")().chainConfigs;
const helper = require("./helper");
const webpack = require("webpack");

module.exports = function () {
  const nodeEnv = process.argv[process.argv.length - 1];
  const components = helper.normalizeComponent(nodeEnv);
  const results = [];

  baseConfigs.forEach((config, index) => {
    const filePath = helper.getComponentFilePath(components[index]); // example/yang-test/hello-world
    const comment = getComment(helper.resolve("src", filePath, "./comment.js"));
    config.devtool("eval-source-map");
    config.mode("development");

    config.plugin("banner-plugin").use(webpack.BannerPlugin, [
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

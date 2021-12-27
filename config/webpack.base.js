/* eslint-disable no-console */
const path = require("path");
const helper = require("./helper");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
const Config = require("webpack-chain");
const config = new Config();

module.exports = function () {
  const nodeEnv = process.argv[process.argv.length - 1];
  const components = helper.normalizeComponent(nodeEnv);
  const chainConfigs = [];
  const webpackConfigs = [];
  components.forEach((component) => {
    const filePath = helper.getComponentFilePath(component); // example/yang-test/hello-world
    const fileName = helper.getComponentFileName(component); // hello-world
    config
      .entry(fileName)
      .add(path.join(__dirname, "../src/", filePath, fileName + ".ts"))
      .end()
      .output.path(helper.resolve("dist"))
      .filename("[name].user.js");

    config.module
      .rule("ts-compile")
      .test(/\.tsx?$/)
      .exclude.add(/node_modules/)
      .end()
      .use("ts-loader")
      .loader("ts-loader")
      .options({
        appendTsSuffixTo: [/\.vue$/],
      });

    config.module
      .rule("vue-compile")
      .test(/\.vue$/)
      .use("vue-loader")
      .loader("vue-loader");

    config.module
      .rule("mjs-compile")
      .test(/\.mjs$/i)
      .resolve.set("fullySpecified", false);

    config.module
      .rule("style-compile")
      .test(/\.css$/)
      .use("style-loader")
      .loader("style-loader")
      .end()
      .use("css-loader")
      .loader("css-loader");

    config.module
      .rule("media-compile")
      .test(/\.(jpg|jpeg|gif|png|svg|bmp|cur|ico|mp4|wav|mp3|webp)$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        name: "[md5:contenthash].[ext]",
        limit: 81920,
        esModule: false,
      });

    config.module
      .rule("scss-compile")
      .test(/\.scss$/)
      .use("style-loader")
      .loader("style-loader")
      .end()
      .use("css-loader")
      .loader("css-loader")
      .end()
      .use("sass-loader")
      .loader("sass-loader")
      .options({
        implementation: require("sass"),
      });

    config.resolve.extensions
      .add(".ts")
      .add(".vue")
      .add(".tsx")
      .add(".js")
      .add(".mjs")
      .end()
      .alias.set("@src", helper.resolve("src"))
      .set("@lib", helper.resolve("lib"));

    config.plugin("vue-loader-plugin").use(VueLoaderPlugin);
    config.plugin("define-plugin").use(webpack.DefinePlugin, [
      {
        __VUE_OPTIONS_API__: false,
        __VUE_PROD_DEVTOOLS__: false,
      },
    ]);

    chainConfigs.push(config);
    webpackConfigs.push(config.toConfig());
  });

  return { chainConfigs, webpackConfigs };
};

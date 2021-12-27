const path = require("path");
function getComponentFileName(file) {
  const array = file.split(/\/|\\/);
  return array[array.length - 1];
}

function getComponentFilePath(file) {
  return file;
}

function normalizeComponent(component) {
  component = component.replace(/\\/g, "/").replace(/src\//g, "");
  return component.split(/[,| ]/);
}

const resolve = (...dir) => path.resolve(__dirname, "../", ...dir);

exports.getComponentFileName = getComponentFileName;
exports.getComponentFilePath = getComponentFilePath;
exports.normalizeComponent = normalizeComponent;
exports.resolve = resolve;

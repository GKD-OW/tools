const hasArgument = require('./utils').hasArgument;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (root, config) {
  // 修改dev相关选项
  require('./dev')(root, config);
  // externals
  require('./externals')(root, config);
  // 入口修改
  config.entry = {
    index: path.resolve(root, 'src/index.js')
  };
  if (config.plugins && Array.isArray(config.plugins)) {
    let hasHtml = false;
    for (const k in config.plugins) {
      const it = config.plugins[k];
      if (typeof (it) === 'object' && it.__proto__.constructor.name === 'HtmlWebpackPlugin') {
        hasHtml = true;
        config.plugins.splice(k, 1);
        break;
      }
    }
    if (hasHtml) {
      config.plugins.push(new HtmlWebpackPlugin({
        inject: true,
        chunks: 'index',
        template: path.resolve(root, 'src/index.html'),
        filename: "index.html"
      }));
    }
  }
  // 不生成bundle分析
  if (config.mode === 'production' && !hasArgument('a')) {
    for (const k in config.plugins) {
      const it = config.plugins[k];
      if (typeof (it) === 'object' && it.__proto__.constructor.name === 'BundleAnalyzerPlugin') {
        config.plugins.splice(k, 1);
        break;
      }
    }
  }
  // 关闭大小警告
  if (!config.performance) {
    config.performance = {};
  }
  config.performance.maxEntrypointSize = 1024000;
  config.performance.maxAssetSize = 1024000;
  return config;
}
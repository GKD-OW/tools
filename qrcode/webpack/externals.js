module.exports = function(root, config) {
  if (typeof (config.externals) === "undefined") {
    config.externals = {};
  }
  config.externals['react'] = 'window.React';
  config.externals['react-dom'] = 'window.ReactDOM';
  config.externals['@alifd/next'] = 'window.Next';
}
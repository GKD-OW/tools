const hasArgument = require('./utils').hasArgument;

module.exports = function (root, config) {
	// 调试模式下，开启自动重载和自动编译
	if (config.mode === 'development' && hasArgument('w')) {
		config.watch = true;
		config.watchOptions = {
      aggregateTimeout: 500,
      ignored: ['node_modules', 'bower_components', 'components']
		};
	}
	return config;
}
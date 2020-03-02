const overwrite = require('./webpack');

module.exports = config => {
  return overwrite(__dirname, config);
};

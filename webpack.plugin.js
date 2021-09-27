const fs = require('fs');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const list = require('./list');

module.exports = ({ onGetWebpackConfig, onHook }) => {
  onGetWebpackConfig((config) => {
    const toCopy = [];
    // 遍历列表
    Object.keys(list).forEach((k) => {
      const item = list[k];
      if (item.type === 'webpack') {
        config.entry(k).add(path.join(__dirname, k, item.entry)).end();
      }
      if (item.type === 'other') {
        toCopy.push(k);
      }
    });
    // 如果有复制的话
    if (toCopy.length > 0) {
      config.plugin('copy').use(CopyPlugin, [
        {
          patterns: toCopy.map((item) => {
            return {
              from: path.join(__dirname, 'apps', item),
              to: item,
            };
          }),
        },
      ]);
    }
  });

  const beforeRun = () => {
    let result = 'const App=[\n';
    Object.keys(list).forEach((k) => {
      const item = list[k];
      if (item.type === 'react') {
        const compName = 'Comp' + k;
        result = ''.concat('import ', compName, ' from "../apps/', k, '/', item.entry, '";\n', result);
        let itemText = JSON.stringify({
          key: k,
          ...item,
          entry: '__ENTRY__',
        });
        itemText = itemText.replace('"__ENTRY__"', compName);
        result += itemText;
      } else {
        result += JSON.stringify({
          key: k,
          ...item,
        });
      }
      result += ',\n';
    });
    result += '];\nexport default App;';
    fs.writeFileSync(path.join(__dirname, 'src/list.js'), result, {
      encoding: 'utf-8',
    });
  };

  onHook('before.start.run', beforeRun);
  onHook('before.build.run', beforeRun);
};

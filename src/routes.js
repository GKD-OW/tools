import BasicLayout from '@/layouts/Basic';
import Home from '@/pages/Home';
import Micro from '@/pages/Micro';
import list from './list';

const children = [];

list.forEach((item) => {
  if (item.type === 'react') {
    // React 直接打包进来
    children.push({
      path: `/${item.key}`,
      component: item.entry,
    });
  } else {
    // 微前端方案
    children.push({
      path: `/${item.key}`,
      component: Micro,
    });
  }
});

children.push({
  path: '/',
  component: Home,
});

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children,
  },
];

export default routerConfig;

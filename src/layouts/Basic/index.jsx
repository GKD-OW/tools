import { Menu } from 'antd';
import { useHistory, useLocation } from 'ice';
import React, { useCallback, useMemo } from 'react';
import list from '../../list';

const Basic = (props) => {
  const { children } = props;
  const history = useHistory();
  const location = useLocation();

  const handleClick = useCallback(
    ({ key }) => {
      history.push(`/${key}`);
    },
    [history],
  );

  const selectedKeys = useMemo(() => {
    const k = location.pathname.substr(1);
    if (k === '') return ['home'];
    else return [k];
  }, [location.pathname]);

  return (
    <div className="basic-layout">
      <Menu mode="inline" selectedKeys={selectedKeys} onClick={handleClick}>
        <Menu.Item key="home">首页</Menu.Item>
        {list.map((item) => {
          return <Menu.Item key={item.key}>{item.title}</Menu.Item>;
        })}
      </Menu>
      <div className="layout-content">{children}</div>
    </div>
  );
};

export default Basic;

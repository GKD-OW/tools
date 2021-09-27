import { useRouteMatch } from 'ice';
import { loadMicroApp } from 'qiankun';
import React, { useEffect, useRef } from 'react';

function Micro() {
  const ref = useRef(null);
  const route = useRouteMatch();
  useEffect(() => {
    const key = route.path.substr(1);
    loadMicroApp({
      name: key,
      entry: `/${key}/index.html`,
      container: ref.current,
    });
  }, [route.path]);

  return (
    <div id="micro-container" ref={ref}>
      正在加载，请稍候
    </div>
  );
}

export default Micro;

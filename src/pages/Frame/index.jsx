import { useRouteMatch } from "ice";
import React, { useMemo } from "react";

function Frame() {
  const route = useRouteMatch();

  const frameUrl = useMemo(() => {
    const key = route.path.substr(1);
    return `/${key}/index.html`;
  }, [route.path]);

  return <iframe className="main-frame" src={frameUrl} />;
}

export default Frame;

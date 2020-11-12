import React, { memo, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';

function Main(props) {
  return (
    <Suspense fallback='loading...'>
      Main
      { renderRoutes(props.route.routes) }
    </Suspense>
  )
}

export default memo(Main);

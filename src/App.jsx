import React from 'react';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from './routes';

import useRouterGuard from './hooks/useRouterGuard';

/**
 * 1. 未登录的路由处理
 * 2. 升级：权限路由处理
 * 
 * Router(routes, path)
 */

function App() {
  return (
    <>
      { renderRoutes(useRouterGuard(routes)) }
    </>
  )
}

export default withRouter(App);

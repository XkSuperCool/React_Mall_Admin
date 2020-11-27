import React from 'react';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from './routes';

import useRouterGuard from './hooks/useRouterGuard';

function App() {
  return (
    <HashRouter>
      {
        renderRoutes(useRouterGuard(routes))
      }
    </HashRouter>
  );
}

export default App;

import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { HashRouter, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from './routes';
const excludes = ['/login'];

function App() {
  const { isLogin } = useSelector(state => ({
    isLogin: state.getIn(['adminInfo', 'admin_info']).username ? true : false
  }), shallowEqual);
 
  return (
    <HashRouter>
      { renderRoutes(routes) }
    </HashRouter>
  )
}

export default App;

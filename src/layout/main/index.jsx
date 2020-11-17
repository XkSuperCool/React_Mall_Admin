import React, { memo, Suspense, useState } from 'react';
import { renderRoutes } from 'react-router-config';

import Context from './context';
import Sidebar from './sidebar';
import Header from './header';
import MainWrapper from './style';

function Main(props) {
  const [sidebarActive, setSidebarActive] = useState(false);

  return (
    <Suspense fallback='loading...'>
      <MainWrapper>
        <Context.Provider value={{ sidebarActive, setSidebarActive }}>
          <Sidebar></Sidebar>
          <div className='content'>
            <Header></Header>
            <div className='main'>
              { renderRoutes(props.route.routes) }
            </div>
          </div>
        </Context.Provider>
      </MainWrapper>
    </Suspense>
  )
}

export default memo(Main);

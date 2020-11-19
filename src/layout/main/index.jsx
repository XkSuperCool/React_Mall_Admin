import React, { memo, Suspense, useState } from 'react';
import { renderRoutes } from 'react-router-config';

import Context from './context';
import Sidebar from './sidebar';
import Header from './header';
import MainWrapper from './style';

function Main(props) {
  const [sidebarActive, setSidebarActive] = useState(false);

  return (
    <MainWrapper>
      <Context.Provider value={{ sidebarActive, setSidebarActive }}>
        <Sidebar></Sidebar>
        <div className='content'>
          <Header></Header>
          <div className='main'>
            <Suspense fallback='loading...'>
              {
                renderRoutes(
                  props.route.routes
                )
              }
            </Suspense>
          </div>
        </div>
      </Context.Provider>
    </MainWrapper>
  );
}

export default memo(Main);

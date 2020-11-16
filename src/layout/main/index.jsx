import React, { memo, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';

import MainWrapper from './style';

function Main(props) {
  return (
    <Suspense fallback='loading...'>
      <MainWrapper>
        <div className='slider'>
          Slider
        </div>
        <div className='content'>
          <header>
            <div className='logo'>
              <h1>Logo</h1>
            </div>
            <div>
              操作
            </div>
          </header>
          <div className='main'>
            { renderRoutes(props.route.routes) }
          </div>
        </div>
      </MainWrapper>
    </Suspense>
  )
}

export default memo(Main);

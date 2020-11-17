import React, { memo, Suspense, useState } from 'react';
import { renderRoutes } from 'react-router-config';

import Context from './context';
import Slider from './slider';
import Header from './header';
import MainWrapper from './style';

function Main(props) {
  const [sliderActive, setSliderActive] = useState(false);

  return (
    <Suspense fallback='loading...'>
      <MainWrapper>
        <Context.Provider value={{ sliderActive, setSliderActive }}>
          <Slider></Slider>
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

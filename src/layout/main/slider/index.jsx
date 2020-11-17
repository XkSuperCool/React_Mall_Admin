import React, { memo, useContext, useEffect, useState } from 'react';
import { MenuFoldOutlined } from '@ant-design/icons';

import Context from '../context';
import SliderWrapper from './style';
import SliderMenu from '../slider_menu';

function Slider() {
  const context = useContext(Context);
  const [sliderMini, setSliderMini] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const clientWidth = document.body.clientWidth;
      switch(true) {
        case clientWidth >= 788 :
          setSliderMini(false);
          context.setSliderActive(false);
          break;
        case clientWidth >= 764 && clientWidth < 788 :
          context.setSliderActive(false);
          setSliderMini(true);
          break;
        case clientWidth <= 764 :
          setSliderMini(false);
          break;
        default : return;
      }
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, [context]);

  return (
    <SliderWrapper>
      <div className={ `slider ${ context.sliderActive ? 'slider-active' : '' } ${ sliderMini ? 'slider-mini' : '' }` }>
        <div className='slider-content'>
          <div className='logo'>
            Logo
          </div>
          <SliderMenu inlineCollapsed={ sliderMini }></SliderMenu>
          <div className='toggle'>
            <MenuFoldOutlined onClick={ () => setSliderMini(!sliderMini) } />
          </div>
        </div>
        <div className='slider-curtain' onClick={ () => context.setSliderActive(false) }></div>
      </div>
      <div className='foundation'></div>
    </SliderWrapper>
  );
}

export default memo(Slider);

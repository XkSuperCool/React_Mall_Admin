import React, { memo, useContext } from 'react';
import { MenuFoldOutlined } from '@ant-design/icons';

import HeaderWrapper from './style';
import Context from '../context';

function Header() {
  const context = useContext(Context);

  return (
    <HeaderWrapper>
      <div className='toggle'>
        <MenuFoldOutlined onClick={ () => context.setSliderActive(true) } />
      </div>
      <div>
        操作
      </div>
    </HeaderWrapper>
  );
}

export default memo(Header);

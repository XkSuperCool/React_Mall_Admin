import React, { memo, useContext, useEffect, useState } from 'react';
import { MenuFoldOutlined } from '@ant-design/icons';

import Context from '../context';
import SidebarWrapper from './style';
import SidebarMenu from '../sidebar_menu';

function Sidebar() {
  const context = useContext(Context);
  const [sidebarMini, setSidebarMini] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const clientWidth = document.body.clientWidth;
      switch(true) {
        case clientWidth >= 788 :
          setSidebarMini(false);
          context.setSidebarActive(false);
          break;
        case clientWidth >= 764 && clientWidth < 788 :
          context.setSidebarActive(false);
          setSidebarMini(true);
          break;
        case clientWidth <= 764 :
          setSidebarMini(false);
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
    <SidebarWrapper>
      <div className={ `sidebar ${ context.sidebarActive ? 'sidebar-active' : '' } ${ sidebarMini ? 'sidebar-mini' : '' }` }>
        <div className='sidebar-content'>
          <div className='logo'>
            Logo
          </div>
          <SidebarMenu inlineCollapsed={ sidebarMini }></SidebarMenu>
          <div className='toggle'>
            <MenuFoldOutlined onClick={ () => setSidebarMini(!sidebarMini) } />
          </div>
        </div>
        <div className='sidebar-curtain' onClick={ () => context.setSidebarActive(false) }></div>
      </div>
      <div className='foundation'></div>
    </SidebarWrapper>
  );
}

export default memo(Sidebar);

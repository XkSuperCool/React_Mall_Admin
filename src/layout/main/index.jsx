import React, { memo, Suspense, useState, useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { useSelector, shallowEqual } from 'react-redux';

import Context from './context';
import Sidebar from './sidebar';
import Header from './header';
import MainWrapper from './style';
import { getAdminAccessUrls } from '@/api/access';

import useRouterGuard from '@/hooks/useRouterGuard';

function Main(props) {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [urls, setUrls] = useState([]);
  const { roleId } = useSelector(state => ({
    roleId: state.getIn(['adminInfo', 'admin_info']).role_id
  }), shallowEqual);

  useEffect(() => {
    getAdminAccessUrls(roleId).then(urls => {
      setUrls(urls);
    });
  }, [roleId]);

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
                  useRouterGuard(props.route.routes, urls)
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

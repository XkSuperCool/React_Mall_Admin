import { useEffect, useRef } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAdminAccessUrls } from '@/api/access';

function useRouterGuard(routes, authURL) {
  const routesRef = useRef(routes);
  const { info } = useSelector(state => ({
    info: state.getIn(['adminInfo', 'admin_info'])
  }), shallowEqual);

  useEffect(() => {
    routesRef.current = routes.map(item => {
      const route = { ...item };
      if (route.auth) {
        if (info.hasOwnProperty('username')) {
          route.render = () => <Redirect to='/login' />;
        } else if (route.render) {
          delete route.render;
        }
      }
      return route;
    });
  }, [info, routes]);

  useEffect(() => {
    if (info.role_id !== undefined && authURL) {
      getAdminAccessUrls(info.role_id).then(urls => {
        routesRef.current = routes.map(item => {
          const route = { ...item };
          if (route.auth && info.is_super === false) {
            if (urls.includes(route.path) === false) {
              route.render = () => <Redirect to='*' />;
            } else if (route.render) {
              delete route.render;
            }
          }
          return route;
        });
      });
    }
  }, [info, routes, authURL]);
  
  return routesRef.current;
}

export default useRouterGuard;

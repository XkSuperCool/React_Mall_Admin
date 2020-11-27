import { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAdminAccessUrls } from '@/api/access';

function useRouterGuard(routes, authURL) {
  const [routesState, setRoutesState] = useState(routes);
  const { info } = useSelector(state => ({
    info: state.getIn(['adminInfo', 'admin_info'])
  }), shallowEqual);

  useEffect(() => {
    const r = routes.map(item => {
      const route = { ...item };
      if (route.auth) {
        if (info.hasOwnProperty('username') === false) {
          route.render = () => <Redirect to='/login' />;
        } else if (route.render) {
          delete route.render;
        }
      }
      return route;
    });
    setRoutesState(r);
  }, [info, routes]);

  useEffect(() => {
    if (info.role_id !== undefined && authURL) {
      getAdminAccessUrls(info.role_id).then(urls => {
        const r = routes.map(item => {
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
        setRoutesState(r);
      });
    }
  }, [info, routes, authURL]);

  return routesState;
}

export default useRouterGuard;

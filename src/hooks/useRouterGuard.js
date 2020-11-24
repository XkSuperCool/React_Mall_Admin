import { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';

function loginCheck(routes, isLogin) {
  for (const route of routes) {
    if (route.auth) {
      if (isLogin === false) {
        route.render = () => <Redirect to='/login' />;
      } else {
        delete route.render;
      }
    }
    
    if (route.routes && route.routes.length) {
      loginCheck(route.routes, isLogin);
    }
  }
}

function useRouterGuard(routes) {
  const { info } = useSelector(state => ({
    info: state.getIn(['adminInfo', 'admin_info'])
  }), shallowEqual);
  
  useEffect(() => {
    const isLogin = info.username ? true : false;
    // 登录验证
    loginCheck(routes, isLogin);
  }, [routes, info]);

  return routes;
}

export default useRouterGuard;
;
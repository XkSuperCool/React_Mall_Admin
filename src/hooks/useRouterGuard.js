import { useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';

function useRouterGuard(routes, authPaths) {
  const { isLogin } = useSelector(state => ({
    isLogin: state.getIn(['adminInfo', 'admin_info']).username ? true : false
  }), shallowEqual);

  return routes.map(item => {
    if (item.auth) {
      if (isLogin === false) {
        item.render = () => <Redirect to='/login' />;
      } else {
        if (authPaths) {
          // url 校验
        }
        delete item.render;
      }
    }
    return item;
  });
}

export default useRouterGuard;

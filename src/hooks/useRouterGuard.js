import { useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';

function useRouterGuard(routes, excludes = []) {
  excludes = excludes.concat(['/login']);
  const { isLogin } = useSelector(state => ({
    isLogin: state.getIn(['adminInfo', 'admin_info']).username ? true : false
  }), shallowEqual);

  const newrouter = routes.map(item => {
    if (!excludes.includes(item.path)) {
      item.render = () => isLogin ? null : <Redirect to='/login' />
    }
    return item;
  });
  console.log(newrouter)
  return newrouter
}

export default useRouterGuard;

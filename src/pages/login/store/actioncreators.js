import { SET_ADMIN_INFO } from './constants';
import { loginAdmin } from '@/api/admin';


// 登录
export const loginAdminAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await loginAdmin(data);
      sessionStorage.setItem('admin_info', JSON.stringify(result));
      dispatch({
        type: SET_ADMIN_INFO,
        value: result
      });
      return true;
    } catch {
      return false;
    }
  }
}

import { CHANGE_ADMIN_INFO } from './constants';
import { loginAdmin } from '@/api/admin';

// 修改管理员信息
export const changeAdminInfoAction = (value) => ({
  type: CHANGE_ADMIN_INFO,
  value: value
});

// 登录
export const loginAdminAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await loginAdmin(data);
      sessionStorage.setItem('user_info', JSON.stringify(result));
      dispatch(changeAdminInfoAction(result));
      return true;
    } catch {
      return false;
    }
  }
}

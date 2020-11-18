import { getAccess } from '@/api/access';
import { SET_ACCESS_LIST } from './constants';


// 获取权限列表
export const getAccessList = (type) => {
  return async (dispatch) => {
    const data = await getAccess(type);
    if (type === undefined) {
      // all
    } else {
      dispatch({
        value: data,
        type: SET_ACCESS_LIST,
      });
    }
  }
}

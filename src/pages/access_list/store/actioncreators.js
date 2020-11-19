import { getAccess } from '@/api/access';
import { SET_ACCESS_LIST, SET_ACCESS_ALL } from './constants';

// 获取权限列表
export const getAccessListAction = (type) => {
  return async (dispatch) => {
    const data = await getAccess(type);
    const actionType = type === undefined ? SET_ACCESS_ALL : SET_ACCESS_LIST
    dispatch({
      value: data,
      type: actionType,
    });
  }
}

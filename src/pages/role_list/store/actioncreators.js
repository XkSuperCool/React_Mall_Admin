import { SET_ROLE_LIST } from './constants';
import { getRoleList } from '@/api/role';

export const getRoleListAction = () => {
  return async (dispatch) => {
    const result = await getRoleList();
    dispatch({
      type: SET_ROLE_LIST,
      value: result
    });
  }
}
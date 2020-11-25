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

export const pushRoleListAction = (value) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: SET_ROLE_LIST,
      value: [...state.getIn(['roleListInfo', 'roleList']), value]
    });
  }
};

export const updateRoleListAction = (id, value) => {
  return (dispatch, getState) => {
    const state = [...getState().getIn(['roleListInfo', 'roleList'])];
    const index = state.findIndex(item => item._id === id);
    if (index !== -1) {
      state.splice(index, 1, Object.assign(value, { _id: id }));
      dispatch({
        type: SET_ROLE_LIST,
        value: state
      });
    }
  }
}
import { Map } from 'immutable';
import { SET_ADMIN_INFO } from './constants';

const adminInfo = sessionStorage.getItem('admin_info');
const initState = Map({
  admin_info: adminInfo ? JSON.parse(adminInfo) : {}
});

export default function adminReducer(state = initState, action) {
  switch(action.type) {
    case SET_ADMIN_INFO :
      return state.set('admin_info', action.value)
    default : return state;
  }
}

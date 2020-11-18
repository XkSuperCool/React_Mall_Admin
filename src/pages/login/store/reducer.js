import { Map } from 'immutable';
import { SET_ADMIN_INFO } from './constants';

const initState = Map({
  admin_info: sessionStorage.getItem('admin_info') ?? {}
});

export default function adminReducer(state = initState, action) {
  switch(action.type) {
    case SET_ADMIN_INFO :
      return state.set('admin_info', action.value)
    default : return state;
  }
}

import { Map } from 'immutable';
import { SET_ROLE_LIST } from './constants'

const initState = Map({
  roleList: []
});

function RoleListReducer(state = initState, action) {
  switch(action.type) {
    case SET_ROLE_LIST :
      return state.set('roleList', action.value);
    default : return state;
  }
}

export default RoleListReducer;

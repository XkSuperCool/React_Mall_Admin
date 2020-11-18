import { Map } from 'immutable';
import { SET_ACCESS_LIST } from './constants';

const initState = Map({
  list: []
});

export default function accessListReducer(state = initState, action) {
  switch(action.type) {
    case SET_ACCESS_LIST :
      return state.set('list', action.value);
    default : return state;
  }
}

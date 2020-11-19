import { Map } from 'immutable';
import { SET_ACCESS_LIST, SET_ACCESS_ALL } from './constants';

const initState = Map({
  list: [],
  treeList: []
});

export default function accessListReducer(state = initState, action) {
  switch(action.type) {
    case SET_ACCESS_LIST :
      return state.set('list', action.value);
    case SET_ACCESS_ALL :
      return state.set('treeList', action.value);
    default : return state;
  }
}

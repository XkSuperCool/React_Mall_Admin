import { combineReducers } from 'redux-immutable';

import adminReducer from '@/pages/login/store/reducer';

export default combineReducers({
  adminInfo: adminReducer
});

import { combineReducers } from 'redux-immutable';

import adminReducer from '@/pages/login/store';

export default combineReducers({
  adminInfo: adminReducer
});

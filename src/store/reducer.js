import { combineReducers } from 'redux-immutable';

import adminReducer from '@/pages/login/store';
import accessListReducer from '@/pages/access_list/store';
import roleListReducer from '@/pages/role_list/store';

export default combineReducers({
  adminInfo: adminReducer,
  accessListInfo: accessListReducer,
  roleListInfo: roleListReducer
});

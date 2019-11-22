import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import enrollment from './enrollment/reducer';
import plan from './plan/reducer';

export default combineReducers({ auth, user, plan, enrollment });

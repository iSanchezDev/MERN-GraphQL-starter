import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import userReducer from './user.reducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer
});

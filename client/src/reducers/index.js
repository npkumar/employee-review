import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import employee from './employee';
import review from './review';

export default combineReducers({
  alert,
  auth,
  employee,
  review
});

import axios from 'axios';
import store from '../store';
import { LOGOUT, CLEAR_EMPLOYEE } from '../actions/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Logout user if token is invalid
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response.data.msg === 'Invalid token') {
      store.dispatch({ type: LOGOUT });
      store.dispatch({ type: CLEAR_EMPLOYEE });
    }
    return Promise.reject(err);
  }
);

export default api;

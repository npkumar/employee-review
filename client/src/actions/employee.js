import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_EMPLOYEE,
  GET_EMPLOYEES,
  EMPLOYEE_ERROR,
  CLEAR_EMPLOYEE,
  ACCOUNT_DELETED
} from './types';

// Get current employee
export const getCurrentEmployee = () => async dispatch => {
  try {
    const res = await api.get('/employee/me');

    dispatch({
      type: GET_EMPLOYEE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all employees
export const getEmployees = () => async dispatch => {
  dispatch({ type: CLEAR_EMPLOYEE });

  try {
    const res = await api.get('/employee');

    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get employee by ID
export const getEmployeeById = userId => async dispatch => {
  try {
    const res = await api.get(`/employee/user/${userId}`);

    dispatch({
      type: GET_EMPLOYEE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update employee
export const createEmployee = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const res = await api.post('/employee', formData);

    dispatch({
      type: GET_EMPLOYEE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Employee Updated' : 'Employee Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete account and employee
export const deleteAccount = (userId) => async dispatch => {
  if (window.confirm('Are you sure?')) {
    try {
      await api.delete(`/employee/user/${userId}`);

      dispatch({ type: CLEAR_EMPLOYEE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: EMPLOYEE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

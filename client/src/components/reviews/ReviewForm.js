import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReview } from '../../actions/review';
import { getEmployees } from '../../actions/employee';

const ReviewForm = ({ 
  addReview,
  getEmployees,
  auth: { user },
  employee: { employees, loadingEmployees },
  history
}) => {
  const [text, setText] = useState('');
  const [userId, setUserId] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addReview({ text, userId: userId ? userId : employees[0].user._id }, history);
    setText('');
  };

  const onHandleUserSelect = (e) => {
    const userId = employees.find(emp => emp.user.email === e.target.value).user._id;
    setUserId(userId);
  };

  useEffect(() => { getEmployees() }, [getEmployees]);

  if (user && !user.isAdmin) {
    return <h4 className="text-muted">Only admins can add or edit reviews.</h4>
  }

  return (
    <div>
      <form
        className='form my-3'
        onSubmit={onSubmit}
      >
        <textarea
          className="form-control"
          name='text'
          rows='3'
          placeholder='Add a review'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />

        {!loadingEmployees && employees && (
          <div className="form-group">
            <label className="label label-default my-3">Select user</label>
            <select className="form-control" onChange={onHandleUserSelect}>
              {employees.map(employee => <option key={employee._id}>{employee.user.email}</option>)}
            </select>
          </div>
        )}

        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

ReviewForm.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  employee: state.employee
});

export default connect(
  mapStateToProps,
  { addReview, getEmployees }
)(ReviewForm);

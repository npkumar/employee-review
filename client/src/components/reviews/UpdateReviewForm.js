import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateReview, getReview } from '../../actions/review';
import { getEmployees } from '../../actions/employee';
import { Link } from 'react-router-dom';

const UpdateReviewForm = ({ 
  updateReview,
  getReview,
  getEmployees,
  review: { review, loading },
  auth: { user },
  employee: { employees, loadingEmployees },
  history,
  match 
}) => {
  const [text, setText] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    updateReview({ text, userId: userId ? userId : employees[0].user._id, reviewId: review._id }, history);
    setText('');
  };

  const handleUserSelect = (e) => {
    const userId = employees.find(emp => emp.user.email === e.target.value).user._id;
    setUserId(userId);
    setEmail(e.target.value);
  };

  useEffect(() => { getEmployees() }, [getEmployees]);

  useEffect(() => {
    if (!review) getReview(match.params.id);
    if (!loading && review) {
      setText(review.text);
    }
  }, [getReview, loading, match, review]);

  if (user && !user.isAdmin) {
    return <h4 className="text-muted">Only admins can add or edit reviews.</h4>
  }

  return (
    <div>
      <Link to="/reviews" className="btn btn-success">
        Back To Reviews
      </Link>
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

        {!loadingEmployees && employees && review && (
          <div className="form-group">
            <label className="label label-default my-3">Select user</label>
            <select
            className="form-control"
            value={email ? email : review.user.email}
            onChange={handleUserSelect}>
              {employees.map(employee => <option key={employee._id}>{employee.user.email}</option>)}
            </select>
          </div>
        )}

        <input type='submit' className='btn btn-dark my-3' value='Submit' />
      </form>
    </div>
  );
};

UpdateReviewForm.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  updateReview: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  review: state.review,
  employee: state.employee
});

export default connect(
  mapStateToProps,
  { updateReview, getReview, getEmployees }
)(UpdateReviewForm);

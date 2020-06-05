import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteReview } from '../../actions/review';

const ReviewItem = ({
  deleteReview,
  auth,
  review: { _id, text, name, user, feedbacks, date }
}) => (
  <div className="card w-100 my-3">
    <div className="card-body">
      <Link className="card-title" to={`/employee/${user}`}>
        <h4>{name}</h4>
      </Link>
      <p className="card-text">{text}</p>
      <p className="text-muted m-0 fs-12">
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      
      <Link to={`/reviews/${_id}`} className='btn btn-secondary'>
        Feedback
        {feedbacks.length > 0 && (
          <span className='badge badge-success ml-2'>{feedbacks.length}</span>
        )}
      </Link>
      {!auth.loading && auth.user.isAdmin && (
        <>
          <button
            onClick={() => deleteReview(_id)}
            type='button'
            className='btn btn-danger ml-3'
          >
            <i className='fas fa-times' />
          </button>
          <Link to={`/edit-review/${_id}`} className='btn btn-success ml-3'>
            <i className='fas fa-pen text-white' />
          </Link>
        </>
      )}
    </div>
  </div>
);

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteReview: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteReview }
)(ReviewItem);

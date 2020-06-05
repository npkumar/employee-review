import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteFeedback } from '../../actions/review';

const FeedbackItem = ({
  reviewId,
  feedback: { _id, text, name, user, date },
  auth,
  deleteFeedback
}) => (
  <div className="card my-3">
    <div className="card-body">
      <h5 className="card-text">{text}</h5>
      <p className="m-0 card-text">Feedback from: {name}</p>
      <p className="m-0 text-muted">
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {!auth.loading && (user === auth.user._id || auth.user.isAdmin) && (
        <button
          onClick={() => deleteFeedback(reviewId, _id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times' /> Delete
        </button>
      )}
    </div>
  </div>
);

FeedbackItem.propTypes = {
  reviewId: PropTypes.string.isRequired,
  feedback: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteFeedback: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteFeedback }
)(FeedbackItem);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import FeedbackForm from '../review/FeedbackForm';
import FeedbackItem from '../review/FeedbackItem';
import { getReview } from '../../actions/review';
import ReviewItem from '../reviews/ReviewItem';

const Review = ({ getReview, review: { review, loading }, match }) => {
  useEffect(() => {
    getReview(match.params.id);
  }, [getReview, match.params.id]);

  return loading || review === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/reviews" className="btn btn-success">
        Back To Reviews
      </Link>
      <ReviewItem review={review} />
      <FeedbackForm reviewId={review._id} />
      <div className="comments">
        {review.feedbacks.map((feedback) => (
          <FeedbackItem key={feedback._id} feedback={feedback} reviewId={review._id} />
        ))}
      </div>
    </>
  );
};

Review.propTypes = {
  getReview: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  review: state.review
});

export default connect(mapStateToProps, { getReview })(Review);

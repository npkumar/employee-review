import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';
import { getReviews } from '../../actions/review';

const Reviews = ({ getReviews, review: { reviews } }) => {
  useEffect(() => { getReviews() }, [getReviews]);

  return (
    <>
      <h1 className="text-secondary">Reviews</h1>
      <ReviewForm />
      {reviews.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </>
  );
};

Reviews.propTypes = {
  getReviews: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  review: state.review
});

export default connect(mapStateToProps, { getReviews })(Reviews);

import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_REVIEWS,
  REVIEW_ERROR,
  DELETE_REVIEW,
  REMOVE_FEEDBACK,
  ADD_FEEDBACK,
  GET_REVIEW,
  ADD_REVIEW,
  UPDATE_REVIEW,
  CLEAR_REVIEW
} from './types';

// Get reviews
export const getReviews = () => async dispatch => {
  try {
    const res = await api.get('/reviews');

    dispatch({
      type: GET_REVIEWS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete review
export const deleteReview = id => async dispatch => {
  try {
    await api.delete(`/reviews/${id}`);

    dispatch({
      type: DELETE_REVIEW,
      payload: id
    });

    dispatch(setAlert('Reivew Removed', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add review
export const addReview = (
  formData,
  history
  ) => async dispatch => {
  try {
    const res = await api.post('/reviews', formData);
    dispatch({
      type: ADD_REVIEW,
      payload: res.data
    });

    dispatch(setAlert('Review Created', 'success'));
    if (history) history.push('/reviews');
  } catch (err) {
    console.log('err: ', err);
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update review
export const updateReview = (
  formData,
  history
  ) => async dispatch => {
  try {
    const res = await api.put(`/reviews/${formData.reviewId}`, formData);

    dispatch({
      type: UPDATE_REVIEW,
      payload: res.data
    });

    dispatch({ type: CLEAR_REVIEW });
    dispatch(setAlert('Review Updated', 'success'));
    if (history) history.push('/reviews');
  } catch (err) {
    console.log('err: ', err);
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get review
export const getReview = id => async dispatch => {
  try {
    const res = await api.get(`/reviews/${id}`);

    dispatch({
      type: GET_REVIEW,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add feedback
export const addFeedback = (reviewId, formData) => async dispatch => {
  try {
    const res = await api.post(`/reviews/feedback/${reviewId}`, formData);

    dispatch({
      type: ADD_FEEDBACK,
      payload: res.data
    });

    dispatch(setAlert('Feedback Added', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete feedback
export const deleteFeedback = (reviewId, feedbackId) => async dispatch => {
  try {
    await api.delete(`/reviews/feedback/${reviewId}/${feedbackId}`);

    dispatch({
      type: REMOVE_FEEDBACK,
      payload: feedbackId
    });

    dispatch(setAlert('Feedback Removed', 'success'));
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

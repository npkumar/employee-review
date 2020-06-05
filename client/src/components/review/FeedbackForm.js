import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFeedback } from '../../actions/review';

const FeedbackForm = ({ reviewId, addFeedback }) => {
  const [text, setText] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    addFeedback(reviewId, { text });
    setText('');
  };

  return (
    <form
      className='form my-3'
      onSubmit={onSubmit}
    >
      <textarea
        className="form-control"
        name='text'
        rows='3'
        placeholder='Leave a feedback'
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      <input type='submit' className='btn btn-secondary my-3' value='Submit' />
    </form>
  );
};

FeedbackForm.propTypes = {
  addFeedback: PropTypes.func.isRequired
};

export default connect(
  null,
  { addFeedback }
)(FeedbackForm);

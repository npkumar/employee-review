import express from 'express';
import validator from 'express-validator';
import auth from '../../middleware/auth.js';
import Review from '../../models/Review.js';
import User from '../../models/User.js';
import checkObjectId from '../../middleware/checkObjectId.js';

const router = express.Router();

/**
 * @route    POST api/reviews
 * @desc     Create a review
 * @access   Private
 */
router.post(
  '/',
  [auth, [validator.check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.body.userId || req.user.id;
      const user = await User.findById(userId).select('-password');

      const newReview = new Review({
        text: req.body.text,
        name: user.name,
        user: userId
      });

      const review = await newReview.save();

      res.json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route    GET api/reviews
 * @desc     Get all reviews
 * @access   Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route    GET api/reviews/:id
 * @desc     Get review by ID
 * @access   Private
 */
router.get('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const review = await Review
      .findOne({ _id: req.params.id })
      .populate('user', ['name', 'email', 'isAdmin']);

    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route    PUT api/reviews/:id
 * @desc     Get review by ID
 * @access   Private
 */
router.put('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const review = await Review.findByIdAndUpdate({ _id: req.params.id } , {
      text: req.body.text,
      name: user.name,
      user: user._id
    });

    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route    DELETE api/reviews/:id
 * @desc     Delete a review
 * @access   Private
 */
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    // Author or admin can delete
    if (review.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await review.remove();
    res.json({ msg: 'Review removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route    POST api/reviews/feedback/:id
 * @desc     Feedback on a review
 * @access   Private
 */
router.post(
  '/feedback/:id',
  [
    auth,
    checkObjectId('id'),
    [validator.check('text', 'Text is required').not().isEmpty()]
  ],
  async (req, res) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const review = await Review.findById(req.params.id);

      const newFeedback = {
        text: req.body.text,
        name: user.name,
        user: req.user.id
      };

      review.feedbacks.unshift(newFeedback);
      await review.save();
      res.json(review.feedbacks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route    DELETE api/reviews/feedback/:id/:feedback_id
 * @desc     Delete feedback
 * @access   Private
 */
router.delete('/feedback/:id/:feedback_id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    // Find feedback
    const feedback = review.feedbacks.find(
      (feedback) => feedback.id === req.params.feedback_id
    );  
    if (!feedback) {
      return res.status(404).json({ msg: 'Feedback does not exist' });
    }

    // Author or admin can delete
    if (feedback.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    review.feedbacks = review.feedbacks.filter(
      ({ id }) => id !== req.params.feedback_id
    );

    await review.save();
    return res.json(review.feedbacks);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

export default router;

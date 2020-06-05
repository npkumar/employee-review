import express from 'express';
import validator from 'express-validator';
import checkObjectId from '../../middleware/checkObjectId.js';
import auth from '../../middleware/auth.js';
import Review from '../../models/Review.js';
import Employee from '../../models/Employee.js';
import User from '../../models/User.js';

const router = express.Router();

/**
 * @route    GET api/employee/me
 * @desc     Get current employee
 * @access   Private
 */
router.get('/me', auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({
      user: req.user.id
    }).populate('user', ['name', 'email', 'isAdmin']);

    if (!employee) {
      return res.status(400).json({ msg: 'Employee not assigneed for user' });
    }

    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route    POST api/employee
 * @desc     Create or update employee
 * @access   Private
 */
router.post(
  '/',
  [auth, [validator.check('department', 'Department is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { department, bio } = req.body;

    const employeeFields = {
      user: req.body.userId || req.user.id,
      department,
      bio
    };

    try {
      let employee = await Employee.findOneAndUpdate(
        { user: req.body.userId || req.user.id },
        { $set: employeeFields },
        { new: true, upsert: true }
      );
      res.json(employee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route    GET api/employee
 * @desc     Get all employees
 * @access   Public
 */
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().populate('user', ['name', 'email', 'isAdmin']);
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route    GET api/employee/user/:user_id
 * @desc     Get employee by user ID
 * @access   Public
 */
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const employee = await Employee.findOne({
        user: user_id
      }).populate('user', ['name', 'email', 'isAdmin']);

      if (!employee) return res.status(400).json({ msg: 'Employee not found' });

      return res.json(employee);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

/**
 * @route    DELETE api/employee/user/:user_id
 * @desc     Delete employee, user & reviews
 * @access   Private
 */
router.delete('/user/:user_id', auth, async ({ params: { user_id } }, res) => {
  try {
    // Remove user reviews
    await Review.deleteMany({ user: user_id });
    // Remove employee
    await Employee.findOneAndRemove({ user: user_id });
    // Remove user
    await User.findOneAndRemove({ _id: user_id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;

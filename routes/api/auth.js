import express from 'express';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import config from 'config';
import validator from 'express-validator';
import auth from '../../middleware/auth.js';
import User from '../../models/User.js';

const router = express.Router();

/**
 * @route    GET api/auth
 * @desc     Get user by token
 * @access   Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route    POST api/auth
 * @desc     Authenticate user & get token
 * @access   Public
 */
router.post(
  '/',
  [
    validator.check('email', 'Valid email is required').isEmail(),
    validator.check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Wrong credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Wrong credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin
        }
      };

      jsonwebtoken.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '1 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

export default router;

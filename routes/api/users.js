import express from 'express';
import bycrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import config from 'config';
import validator from 'express-validator';
import User from '../../models/User.js';

const router = express.Router();

/**
 * @route    POST api/users
 * @desc     Register user
 * @access   Public
 */
router.post(
  '/',
  [
    validator.check('name', 'Name is required').not().isEmpty(),
    validator.check('email', 'Valid email is required').isEmail(),
    validator.check(
      'password',
      'Password needs 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, isAdmin } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password,
        isAdmin
      });

      const salt = await bycrypt.genSalt(10);
      user.password = await bycrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id
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

import jsonwebtoken from 'jsonwebtoken';
import config from 'config';

export default (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jsonwebtoken.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Invalid token' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error(`Auth middleware: ${err.message}`);
    res.status(500).json({ msg: 'Server Error' });
  }
};

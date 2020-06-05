import mongoose from 'mongoose';

// Middleware to check if object id is valid
const checkObjectId = (idToCheck) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(400).json({ msg: 'Invalid object ID' });
  next();
};

export default checkObjectId;

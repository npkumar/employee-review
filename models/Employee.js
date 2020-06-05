import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const EmployeeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  department: {
    type: String
  },
  bio: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default model('employee', EmployeeSchema);

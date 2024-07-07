const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  groupID: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  courseID: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  monthlyMissedLessons: {
    type: Number,
    default: 0,
  },
  monthlyMissedHomeworks: {
    type: Number,
    default: 0,
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

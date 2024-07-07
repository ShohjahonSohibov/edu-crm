const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  courseID: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }],
  teacherID: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  assistentTeacherID: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    default: 0
  },
  type: {
    type: String,
    required: true,
    enum: ["head", "assistant", "teacher"]
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }]
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;

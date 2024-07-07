const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  courseType: {
    type: String,
    required: true,
    enum: ['online', 'offline'], 
  },
  duration: {
    type: String, 
    required: true,
  },
  teacherID: [{
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

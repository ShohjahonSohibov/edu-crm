const Teacher = require('../models/teacherModel');

// Create a new teacher
const create = async (req, res, next) => {
  try {
    const teacher = new Teacher(req.body);
    const savedTeacher = await teacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    next(error);
  }
};

// Update an existing teacher by ID
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(updatedTeacher);
  } catch (error) {
    next(error);
  }
};

// Delete a teacher by ID
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get a single teacher by ID
const getSingle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id).populate('courses groups');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    next(error);
  }
};

// Get a list of all teachers
const getList = async (req, res, next) => {
  try {
    const teachers = await Teacher.find().populate('courses groups');
    res.status(200).json(teachers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  update,
  Delete,
  getSingle,
  getList,
};

const Group = require('../models/groupModel');

// Create a new group
const create = async (req, res, next) => {
  try {
    const group = new Group(req.body);
    const savedGroup = await group.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    next(error);
  }
};

// Update an existing group by ID
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedGroup = await Group.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(updatedGroup);
  } catch (error) {
    next(error);
  }
};

// Delete a group by ID
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedGroup = await Group.findByIdAndDelete(id);
    if (!deletedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get a single group by ID
const getSingle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id).populate('courseID students teacherID assistentTeacherID');
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
};

// Get a list of all groups
const getList = async (req, res, next) => {
  try {
    const groups = await Group.find().populate('courseID students teacherID assistentTeacherID');
    res.status(200).json(groups);
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

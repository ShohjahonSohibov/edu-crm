const Student = require('../models/studentModel');

// Create a new student
const create = async (req, res, next) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    next(error);
  }
};

// Update an existing student by ID
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

// Delete a student by ID
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get a single student by ID
const getSingle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate("courseID groupID");
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

// Get a list of all students
const getList = async (req, res, next) => {
  try {
    const [students, totalCount] = await Promise.all([
        Student.aggregate([
          {
            $lookup: {
              from: "courses", // Name of the collection to join
              localField: "CourseID", // Field from the Course collection
              foreignField: "_id", // Field from the Teacher collection
              as: "courses", // Name for the output array field
            },
          },
          {
            $lookup: {
              from: "groups", // Name of the collection to join
              localField: "groupID", // Field from the Course collection
              foreignField: "_id", // Field from the Teacher collection
              as: "groups", // Name for the output array field
            },
          },
          {
            $project: {
              _id: 1,
              title: 1,
              description: 1,
              courseType: 1,
              duration: 1,
              teachers: "$courses",
              teachers: "$groups",
            },
          },
          {
            $limit: parseInt(req.query.limit), // Limit the number of documents returned per page
          },
          {
            $skip: parseInt(req.query.offset), // Skip documents based on calculated skip value
          },
         
        ]),
        Student.countDocuments(), // Count total documents matching the filter
      ]);

      let response = {
        totalCount,
        students
      }

    res.status(200).json(response);
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

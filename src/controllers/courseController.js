const { LIMIT, PAGE } = require("../configs/config");
const Course = require("../models/courseModel");
const { getPageLimit } = require("../utils/method");

// Create a new course
const create = async (req, res, next) => {
  try {
    const course = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    next(error);
  }
};

// Update an existing course by ID
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

// Delete a course by ID
const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get a single course by ID
const getSingle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate("teacherID");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// Get a list of all courses
const getList = async (req, res, next) => {
  try {
    let filter = {};
    const { skip, limit } = getPageLimit(req.query.page, req.query.limit);

    if (req.query.type) {
      filter["courseType"] = req.query.type;
    }
    console.log(filter);
    const [courses, totalCount] = await Promise.all([
      Course.aggregate([
        {
          $lookup: {
            from: "teachers", // Name of the collection to join
            localField: "teacherID", // Field from the Course collection
            foreignField: "_id", // Field from the Teacher collection
            as: "teachers", // Name for the output array field
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            courseType: 1,
            duration: 1,
            teachers: "$teachers",
          },
        },
        {
          $match: filter,
        },
        {
          $skip: skip, // Skip documents based on calculated skip value
        },
        {
          $limit: limit, // Limit the number of documents returned per page
        },
      ]),
      Course.countDocuments(filter), // Count total documents matching the filter
    ]);

    const response = {
    totalCount,
      courses,
    };

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

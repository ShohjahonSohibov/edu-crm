const express = require('express');
const router = express.Router();
const studentRoute = require('./studentRoute')
const courseRoute = require('./courseRoute')
const groupRoute = require('./groupRoute')
const teacherRoute = require('./teacherRoute')

router.use("/student", studentRoute)
router.use("/course", courseRoute)
router.use("/group", groupRoute)
router.use("/teacher", teacherRoute)

module.exports = router
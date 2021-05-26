const StudentRouter = require("express").Router();
const StudentController = require("../Controllers/StudentController");

StudentRouter.get('/enrolledCourses', StudentController.getEnrolledCourses);

StudentRouter.get('/allCourses', StudentController.getAllCourses);

StudentRouter.patch('/enroll/:courseId', StudentController.enroll);

module.exports = StudentRouter;
const jwt = require("jsonwebtoken");
const FacultyController = require('../Controllers/FacultyController');

const FacultyRouter = require("express").Router();

FacultyRouter.get('/courses', FacultyController.getCourses)
FacultyRouter.post('/courses/create', FacultyController.createCourse);

module.exports = FacultyRouter;
const Course = require('../Models/Course.model');
const Enroll = require('../Models/Enroll.model');

exports.getEnrolledCourses = async (req, res, next) => {
    try {
        const enrolledCourses = await Enroll.find({userId: res.locals.accountId}).populate([{path: 'courseId', model: 'course'}])
        res.status(200).json({status: "SUCCESS", result: enrolledCourses})
    }
    catch(err) {
        res.status(500).json({status: "ERROR", message: "Something went wrong!"})
    }
}

exports.enroll = async (req, res, next) => {
    try {
        const newEnroll = await Enroll.create({userId: res.locals.accountId, courseId: req.params.courseId })
        res.status(200).json({status: "SUCCESS", result: newEnroll})
    } catch (error) {
        console.log("ENROLL ERROR", error)
        res.status(500).json({status: "ERROR", message: "Something went wrong!"})
    }
}

exports.getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({});
        res.status(200).json({status: "SUCCESS", result: courses})
    } catch (error) {
        console.log("STUDENT GET ALL COURSES ERROR", error)
        res.status(500).json({status: "ERROR", message: "Something went wrong!"})
    }
}
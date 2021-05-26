const Course = require('../Models/Course.model');
const Enroll = require('../Models/Enroll.model');

exports.getEnrolledCourses = async (req, res, next) => {
    try {
        const enrolledCourses = await Enroll.find({userId: req.localProperties.accountId}).populate([{path: 'courseId', model: 'course'}])
        res.status(200).json({status: "SUCCESS", result: enrolledCourses})
    }
    catch(err) {
        res.status(500).json({status: "ERROR", message: "Something went wrong!"})
    }
}

exports.enroll = async (req, res, next) => {
    try {
        const newEnroll = await (await Enroll.create({userId: req.localProperties.accountId, courseId: req.params.courseId }))
        res.status(200).json({status: "SUCCESS", result: newEnroll})
    } catch (error) {
        res.status(500).json({status: "ERROR", message: "Something went wrong!"})
    }
}

exports.getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({}).limit(20);
        res.status(200).json({status: "SUCCESS", result: course})
    } catch (error) {
        res.status(500).json({status: "ERROR", message: "Something went wrong!"})
    }
}
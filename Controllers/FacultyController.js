const Course = require('../Models/Course.model');
const Enroll = require('../Models/Enroll.model');

exports.getCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({faculty: req.params.id})
        res.status(200).json({status: 'SUCCESS', result: courses})
    } catch (error) {
        res.status(500).json({status: "ERROR", msg: "SOMETHING WENT WRONG"})
    }
}

exports.createCourse = async (req, res, next) => {
    try {
        const newCourse = await Course.create(...req.body);
        res.status(200).json({status: "SUCCESS", result: newCourse})
    }
    catch (error) {
        res.status(500).json({status: "ERROR", msg: "SOMETHING WENT WRONG"})
    }
}


const Course = require('../Models/Course.model');
const Enroll = require('../Models/Enroll.model');

exports.getCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({faculty: res.locals.account.accountId})
        res.status(200).json({status: 'SUCCESS', result: courses})
    } catch (error) {
        if(error.code === 401)
            res.status(401).json({status: "ERROR", message: error.message})
        
        res.status(500).json({status: "ERROR", msg: "SOMETHING WENT WRONG"})
    }
}

exports.createCourse = async (req, res, next) => {
    try {
        if(res.locals.account.role !== 'FACULTY')
            throw {code: 401, message: "Only tutors can access this section"}

        const newCourse = await Course.create({...req.body, totalModules: 10, currentEnrolls: 0});
        res.status(200).json({status: "SUCCESS", result: newCourse})
    }
    catch (error) {
        console.log("COURSE CREATE ERROR", error)
        if(error.code === 401)
            res.status(401).json({status: "ERROR", message: error.message})

        res.status(500).json({status: "ERROR", msg: "SOMETHING WENT WRONG"})
    }
}


const Profile = require('../Models/Profile.model');

exports.upserProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findOneAndUpdate({accountId: req.params.accountId}, {...req.body}, {upsert: true})
        res.status(200).json({status:"SUCCESS", result: profile})
    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({status: "ERROR", message: "Something went wrong!"})
    }
}

exports.getProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({accountId: res.locals.accountId})
        res.status(200).json({status: "SUCCESS", result: profile})
    }
    catch(error) {
        console.log("ERROR", error);
        res.status(500).json({status: "ERROR", message: "Something went wrong!"})
    }
}
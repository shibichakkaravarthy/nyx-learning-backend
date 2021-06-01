const Profile = require('../Models/Profile.model');

exports.upserProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findOneAndUpdate({accountId: res.locals.account.accountId}, {...req.body, accountId: res.locals.account.accountId}, {upsert: true})
        console.log("PROFILE, UPDATE", res.locals.account.accountId, profile);
        res.status(200).json({status:"SUCCESS", result: profile})
    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({status: "ERROR", message: "Something went wrong!"})
    }
}

exports.getProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({accountId: res.locals.account.accountId})
        console.log("PROFILE", res.locals.account.accountId, profile);
        res.status(200).json({status: "SUCCESS", result: profile})
    }
    catch(error) {
        console.log("ERROR", error);
        res.status(500).json({status: "ERROR", message: "Something went wrong!"})
    }
}
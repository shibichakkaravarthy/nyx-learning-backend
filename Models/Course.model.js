const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
	faculty: {
        type: mongoose.Types.ObjectId,
        ref: "profile"
    },
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    waitlistCapacity: {
        type: Number,
        required: true,
    },
    currentEnrolls: {
        type: Number,
        required: true
    },
    totalModules: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("course", CourseSchema);
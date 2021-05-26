const mongoose = require("mongoose");

const EnrollSchema = new mongoose.Schema({
	userId: {
        type: mongoose.Types.ObjectId,
        ref: 'account'
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'course'
    },
    started: {
        type: Boolean,
        required: true,
        default: false,
    },
    startDate: {
        type: Date,
    },
    completedModules: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model("enroll", EnrollSchema);
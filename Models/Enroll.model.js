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
});

module.exports = mongoose.model("enroll", EnrollSchema);
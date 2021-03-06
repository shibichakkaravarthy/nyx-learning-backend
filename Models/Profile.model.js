const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
	accountId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'account'
    },
	name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    languages: {
        type: Array,
        required: true
    },
    bio: {
        type: Array,
        required: true
    },
    alterEmail: String,
    institution: String,
    hometown: String,
    profileImg: String,

});

module.exports = mongoose.model("profile", ProfileSchema);
const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
	emailId: {
        type: String,
        required: true,
        unique: true,
    },
    hash: {
        type: String,
        required: true
    },
	refreshToken: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("account", AccountSchema);
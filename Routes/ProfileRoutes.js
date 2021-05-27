const ProfileController = require('../Controllers/ProfileController');

const ProfileRouter = require("express").Router();

ProfileRouter.get('/', ProfileController.getProfile)
ProfileRouter.post('/', ProfileController.upserProfile)

module.exports = ProfileRouter;
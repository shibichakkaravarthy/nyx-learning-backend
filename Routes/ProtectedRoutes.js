const ProtectedRouter = require('express').Router()
const FacultyRouter = require('./FacultyRoutes')
const StudentRouter = require('./StudentRoutes')
const ProfileRouter = require('./ProfileRoutes')
const jwt = require('jsonwebtoken');

ProtectedRouter.use((req, res, next) => {
	console.log("STARTED CHECKING JWT", req.headers);
	try {
		if(!req.headers.authorization) {
			throw {code: 401, message: "TOKEN NOT FOUND"}
		}
		const bearer = req.headers.authorization;
        const token = bearer.slice(7);
		console.log("Token Started", token);
		const isValid = jwt.verify(token, "PRIVATE_KEY");
		console.log("Token Started", isValid);

		if (isValid.accountId) {
            res.locals.account = {...isValid}
			next();
		}
        else {
            throw {code: 401, message: "INVALID TOKEN"}
        }
	} catch (error) {
		console.log("FAILRD AUTH REQUEST", error)
		res
			.status(401)
			.json({ status: "ERROR", result: { message: "Invalid token" } });
	}
});

ProtectedRouter.use('/faculty', FacultyRouter)
ProtectedRouter.use('/student', StudentRouter)
ProtectedRouter.use('/profile', ProfileRouter)

module.exports = ProtectedRouter;
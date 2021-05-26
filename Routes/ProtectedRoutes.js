const ProtectedRouter = require('express').Router()
const FacultyRouter = require('./FacultyRoutes')
const StudentRouter = require('./StudentRoutes')
const jwt = require('jsonwebtoken');

ProtectedRouter.use((req, res, next) => {
	console.log("STARTED CHECKING JWT", req.headers.authorization.split(" "));
	try {
		const bearer = req.headers.authorization;
        const token = bearer.slice(7);
		console.log("Token Started", bearer.split(' '));
		const isValid = jwt.verify(token, "PRIVATE_KEY");

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

module.exports = ProtectedRouter;
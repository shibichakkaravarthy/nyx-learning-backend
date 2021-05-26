const jwt = require("jsonwebtoken");

const ProtectedRouter = require("express").Router();

ProtectedRouter.use((req, res, next) => {
	console.log("STARTED CHECKING JWT");
	try {
		const token = req.headers.authorization.split(" ")[1];
		console.log("Token Started", token);
		const isValid = jwt.verify(token, process.env.JWT_SECRET_KEY);

		if (isValid.accountId && isValid.role === 'FACULTY') {
			next();
		}
        else {
            throw new Error({CODE: 401, MESSAGE: "INVALID TOKEN"})
        }
	} catch (error) {
		console.log("FAILRD AUTH REQUEST", req.headers.authorization)
		res
			.status(401)
			.json({ status: "ERROR", result: { message: "Invalid token" } });
	}
});

module.exports = ProtectedRouter;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require('../Models/Account.model')

exports.createAccount = async (req, res, next) => {
    try {
        const {emailId, password, role} = req.body;
        const refreshToken = jwt.sign({emailId, role}, "PRIVATE_KEY", { algorithm: "HS256", expiresIn: "14d" })
        const hashedPassword = bcrypt.hashSync(password, 16);
        const newAccount = await Account.create({...req.body, refreshToken, hash: hashedPassword})
        const accessToken = jwt.sign({emailId, accountId: newAccount._id}, "PRIVATE_KEY", { algorithm: "HS256", expiresIn: "15m" })
        const {hash, ...sharableDetails} = newAccount._doc
        res.status(201).json({status: "SUCCESS", result: {...sharableDetails, accessToken}})
    } catch (error) {
        if(error.code === 11000) {
            res.status(409).json({staus: "ERROR", message: "User already exists! Please sign-in with your password"})
        }
        else if(error.errors) {
            res.status(400).json({status: "ERROR", message: "Please fill out all the required fields"})
        }
        else {
            res.status(500).json({error})
        }
    }
}

exports.login = async (req, res, next) => {
    try {
        const {emailId, password} = req.body;
        const account = await Account.findOne({emailId})
        console.log("ACCOUNT", account);
        const isPasswordValid = await bcrypt.compare(password, account.hash)

        if(!isPasswordValid) {
            throw {code: 403}
        }

        const refreshToken = jwt.sign({emailId, accountId: account._id}, "PRIVATE_KEY", { algorithm: "HS256", expiresIn: "14d" })
        const accessToken = jwt.sign({accountId: account._id, role: account.role}, "PRIVATE_KEY", { algorithm: "HS256", expiresIn: "15m" })
        const updatedAccount = await Account.findByIdAndUpdate({_id: account._id}, {refreshToken})
        const {hash, ...sharableDetails} = updatedAccount._doc
        res.status(200).json({status: "SUCCESS", result: {...sharableDetails, accessToken}})

    } catch (error) {
        console.log("ERROR", error)
        if(error.code === 400) {
            res.status(400).json({status: "ERROR", message: "Please fill out all the required fields"})
        }
        else if(error.code === 403) {
            res.status(403).json({status: "ERROR", message: "Please check your credentials"})
        }
        else {
            res.status(500).json({error})
        }
    }
}

exports.refreshToken = async (req, res, next) => {
    console.log("STARTED CHECKING JWT REFDRESH", req.headers.authorization.split(" "));
	try {
		const bearer = req.headers.authorization;
        const token = bearer.slice(7);
		const isValid = jwt.verify(token, "PRIVATE_KEY");

		if (isValid.accountId) {
            const account = await Account.findById(isValid.accountId);
            console.log("ACCOUNT", account, isValid);
            if(account) {
                const accessToken = jwt.sign({accountId: account._id, role: account.role}, "PRIVATE_KEY", { algorithm: "HS256", expiresIn: "15m" })
                res.status(200).json({status:"SUCCESS", result: {accessToken}})
            }
            else {
                throw {code: 401, message: "INVALID ACCOUNT"}
            }
		}
        else {
            throw {code: 401, message: "INVALID TOKEN"}
        }
	} catch (error) {
		console.log("FAILRD AUTH REQUEST", error)
		res
			.status(401)
			.json({ status: "ERROR", message: "Invalid token" });
	}
}
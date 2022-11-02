require("dotenv").config();
const jwt = require('jsonwebtoken')

const auth = (req,res,next) => {
    const token = req.header('Authorization').replace('Bearer ','') || req.cookies.token;

    if(!token) {
        return res.status(403).send({"error":"Please Login"})
    }

    try {
        console.log(jwt.verify(token,process.env.SECRET_KEY))
    } catch (error) {
        return res.status(401).send({"error":"Invalid token"})
    }

    return next()
}

module.exports = auth;
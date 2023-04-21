//jwt middleware
const jwt = require("jsonwebtoken");


const response = require('../utils/response');
const { StatusCodes } = require("http-status-codes");

const generateToken = (userId) => {
    const payload = {
        id: userId,
    };
    return jwt.sign(payload, process.env.APP_JWT_SECRET, {
        expiresIn: "48h",
    });
}

const validateToken = async (req, res, done) => {
    var tokenAuth = req.headers['x-access-token'] || req.headers['authorization'] || req.query.token
    tokenAuth = String(tokenAuth).replace(/Bearer\s/i, '');
    if (!tokenAuth) {
        return response.fail(res, StatusCodes.FORBIDDEN, "no token provided")
    }
    try {
        const decoded = jwt.verify(tokenAuth, process.env.APP_JWT_SECRET);
        req.user = decoded;
        done();
    } catch (err) {
        return response.fail(res, StatusCodes.UNAUTHORIZED, "fail decode")
    }

}

module.exports = {
    generateToken,
    validateToken
};

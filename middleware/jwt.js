//jwt middleware
const jwt = require("jsonwebtoken");
const env = process.env;

const response = require('../utils/response');
const { StatusCodes } = require("http-status-codes");

const generateToken = (userId) => {
    const payload = {
        id: userId,
    };
    return jwt.sign(payload, env.JWT_SECRET, {
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
        const decoded = jwt.verify(tokenAuth, env.JWT_SECRET);
        req.user = decoded;
        done();
    } catch (err) {
        return response.fail(res, StatusCodes.UNAUTHORIZED, err)
    }

}

module.exports = {
    generateToken,
    validateToken
};

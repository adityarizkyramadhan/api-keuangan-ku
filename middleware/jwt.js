//jwt middleware
const jwt = require("jsonwebtoken");
const env = process.env;

const generateToken = (userId) => {
    const payload = {
        id: userId,
    };
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: "48h",
    });
}

//middleware validate token
const validateToken = async (req, res, done) => {
    var tokenAuth = req.headers['x-access-token'] || req.headers['authorization'] || req.query.token
    //remove Bearer from token
    //convert auth to string
    tokenAuth = String(tokenAuth).replace(/Bearer\s/i, '');
    if (!tokenAuth) {
        return res.status(401).json({
            message: 'No token provided'
        })
    }
    try {
        const decoded = jwt.verify(tokenAuth, env.JWT_SECRET);
        req.user = decoded;
        // console.log(req.user);
        done();
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token'
        })
    }

}

module.exports = {
    generateToken,
    validateToken
};

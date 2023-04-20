/**
 * @param {import('express').Response} res
 * @param {number} status
 * @param {*} data
 */

function success(res, status, data) {
    return res.status(status).json({
        is_success: true,
        data,
        message: "success"
    });
}

/**
 * @param {import('express').Response} res
 * @param {number} status
 * @param {String} message
 * @returns {import('express').Response}
 */
function fail(res, status, message) {
    return res.status(status).json({
        is_success: false,
        data: null,
        message: message
    });
}

module.exports = {
    fail,
    success
}

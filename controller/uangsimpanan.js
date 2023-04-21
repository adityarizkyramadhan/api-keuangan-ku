const express = require('express');
const uangRouter = express.Router()
const { StatusCodes } = require('http-status-codes')

const uangRepository = require('../repository/uangsimpanan')
const response = require('../utils/response')
const jwt = require('../middleware/jwt')

uangRouter.post('/', jwt.validateToken, async (req, res) => {
    const userKeuanganId = req.user.id
    const { jumlah, detail } = req.body
    try {
        const data = await uangRepository.create({ jumlah, detail, userKeuanganId })
        if (data.error) {
            return response.fail(res, StatusCodes.BAD_REQUEST, data.error)
        }
        return response.success(res, StatusCodes.CREATED, data)
    } catch (error) {
        return response.fail(res, StatusCodes.INTERNAL_SERVER_ERROR, error)
    }
})

uangRouter.get('/week', jwt.validateToken, async (req,res)=> {
    const userKeuanganId = req.user.id
    try {
        const data = await uangRepository.findOneWeekAgo(userKeuanganId)
        if (data.error) {
            return response.fail(res, StatusCodes.BAD_REQUEST, data.error)
        }
        return response.success(res, StatusCodes.OK, data.data)
    }catch (error) {
        return response.fail(res, StatusCodes.INTERNAL_SERVER_ERROR, error)
    }
})

module.exports = {
    uangRouter
}

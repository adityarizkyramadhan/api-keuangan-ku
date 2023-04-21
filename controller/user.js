const express = require('express');
const userRouter = express.Router()
const bcrypt = require('bcrypt')
const { StatusCodes } = require('http-status-codes')

const userRepository = require('../repository/user')
const response = require('../utils/response')
const jwt = require('../middleware/jwt')


userRouter.post('/register', async (req, res) => {
    const { username, password, name } = req.body
    const hashPass = bcrypt.hashSync(password, 10)
    try {
        const data = await userRepository.create({ username, password: hashPass, name })
        if (data.error) {
            return response.fail(res, StatusCodes.BAD_REQUEST, data.error)
        }
        const token = jwt.generateToken(data.data.id)
        return response.success(res, StatusCodes.CREATED, { token: token })
    } catch (error) {
        return response.fail(res, StatusCodes.INTERNAL_SERVER_ERROR, "server error")
    }
})

userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const data = await userRepository.findByUsername(username)
        if (data.error) {
            return response.fail(res, StatusCodes.BAD_REQUEST, data.error)
        }
        const isLogin = bcrypt.compareSync(password, data.data.password)
        if (!isLogin) {
            return response.fail(res, StatusCodes.UNAUTHORIZED, "password not match")
        }
        const token = jwt.generateToken(data.data.id)
        return response.success(res, StatusCodes.CREATED, { token: token })
    } catch (error) {
        return response.fail(res, StatusCodes.INTERNAL_SERVER_ERROR, "server error")
    }
})

module.exports = {
    userRouter
}

require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require('express')
const app = express()

const { sequelize } = require('./utils/database')
const { userRouter } = require('./controller/user')
const { uangRouter } = require('./controller/uangsimpanan')

const response = require('./utils/response')

app.use(cors())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());

sequelize.sync({
    alter: false
})

app.use('/user', userRouter)

app.use('/uang', uangRouter)

app.get('/', async (req, res) => {
    return response.success(res, 200, null)
})

app.listen(5000, () => {
    console.log("Running on port 5000.");
});

require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require('express')
const app = express()

const { sequelize } = require('./utils/database')
const response = require('./utils/response')
const { userRouter } = require('./controller/user')

app.use(
    cors({
        //array of allowed origins
        origin: [
            "*",
        ],
        credentials: true,
        methods: "GET,POST,DELETE,PUT,PATCH",
        crossDomain: true,
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Accept",
            "Origin",
            "X-Requested-With",
            "X-HTTP-Method-Override",
        ],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

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

app.get('/', async (req, res) => {
    return response.success(res, 200, null)
})

app.listen(5000, () => {
    console.log("Running on port 5000.");
});

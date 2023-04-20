require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require('express')
const app = express()

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

app.get('/', async (req, res) => {
    return res.send('Hello World!')
})

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
});

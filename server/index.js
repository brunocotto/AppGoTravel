require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors")

const app = express();

app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

// rota de autenticação
const authRoute = require("./src/routes/authRoute")
app.use("/auth", authRoute)

// rota de viagens
const travelRoute = require("./src/routes/travelRoute")
app.use("/travel", travelRoute)

app.listen(3000)


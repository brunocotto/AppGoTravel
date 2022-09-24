require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

// rota de autenticação
const authRoute = require("./routes/authRoute")
app.use("/auth", authRoute)

app.listen(3000)


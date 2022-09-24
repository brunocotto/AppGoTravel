require("dotenv").config({path:"./.env"})
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const mongoose = require('mongoose');

// conection MongoDB
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.pyywseu.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    )
    .then( () => {
        console.log("Conexão com o MongoDB bem sucedida.");
    })
    .catch((err) => console.log(err))

module.exports = mongoose;
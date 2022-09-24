// conection MongoDB
require('dotenv').config();
import mongoose from 'mongoose';
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.pyywseu.mongodb.net/bancodaapi?retryWrites=true&w=majority}`
    )
    .then( () => {
        console.log("Conexão com o MongoDB bem sucedida.");
        app.listen(4002);
    })
    .catch((err) => console.log(err));

module.exports = mongoose;
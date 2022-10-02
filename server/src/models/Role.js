const mongoose = require('../database/connection');

//schema/model Role mongoDB
const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Role = mongoose.model('Role', RoleSchema)
module.exports = Role;
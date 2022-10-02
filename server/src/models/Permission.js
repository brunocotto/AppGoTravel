const mongoose = require('../database/connection');

//schema/model Permission mongoDB
const PermissionSchema = new mongoose.Schema({
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

const Permission = mongoose.model('Permission', PermissionSchema)
module.exports = Permission;
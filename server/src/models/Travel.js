const mongoose = require('../database/connection');

//schema/model Travel mongoDB
const TravelSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    destiny: {
        type: String, 
        require: true,
    },
    //A viagem pertence a um user
    user: {
        //forma que o mongo grava o id no banco
        type: mongoose.Schema.Types.ObjectId,
        //define com qual schema a relação é feita
        ref: 'User',
        //a relação é obrigatória
        require: true,
    },
    //tasks: [{
    //    type: mongoose.Schema.Types.ObjectId,
        //define com qual schema a relação é feita
     //   ref: 'Task'
    //}],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Travel = mongoose.model('Travel', TravelSchema)
module.exports = Travel;
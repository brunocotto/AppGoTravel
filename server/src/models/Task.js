const mongoose = require('../database/connection');

//schema/model Task mongoDB
const TaskSchema = new mongoose.Schema({
    tile: {
        type: String,
        require: true,
    },
    travel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Travel',
        //a relação é obrigatória
        require: true,
    },
    //A viagem pertence a um user
    assignedTo: {
        //forma que o mongo grava o id no banco
        type: mongoose.Schema.Types.ObjectId,
        //define com qual schema a relação é feita
        ref: 'User',
        //a relação é obrigatória
        require: true,
    },
    completed: {
        type: Boolean,
        require: true,
        //tarefa criada sempre como não completada
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Task = mongoose.model('Task', TaskSchema)
module.exports = Task;
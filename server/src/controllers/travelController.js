const Travel = require('../models/Travel');
const Task = require('../models/Task');

exports.listTravel = async (req, res) => {
    try {
        //O Método find retorna uma array com todos os documentos que foram encontrados
        //populate(), permite fazer referência a documentos em outras collections
        //nesse caso busquei todos os dados da collection user
        const travels = await Travel.find().populate(['user', 'tasks']);
        //se tudo ocorrer bem, retorna um json das viagens cadastradas
        return res.status(200).json({ travels });
    } catch (error) {
        return res.status(400).json({ error: 'Error loading travels.' })
    }
};

exports.listTravelId = async (req, res) => {
    try {
        const travel = await Travel.findById(req.params.travelId).populate(['user', 'tasks']);

        return res.status(200).json({ travel });
    } catch (error) {
        return res.status(400).json({ error: 'Error loading travel.' })
    }
};

exports.createTravel = async (req, res) => {
    try { 
        const { title, description, destiny, tasks } = req.body;

        //adicionando o usuário que criou a viagem pegando o userId que vem através do token
        //preenchido pelo middleware de auth
        const travel = await Travel.create({ title, description, destiny, user: req.userId });

        //criando, percorrendo cada uma das tarefas e atribuindo a viagem...
        //Promisse.all = aguarda todas as promisses serem executadas
        await Promise.all(tasks.map( async task => {

            //Task.create = cria e já salva, new Task = cria mas ainda não salva
            //insiro todos os campos da task(...task), como é uma relação nx1 referencio o id da viagem
            const travelTask = new Task({ ...task, travel: travel._id });

            //save async, retorna uma promisse.. utilizando um callback para obter os dados da task
            await travelTask.save(); 
            
            travel.tasks.push(travelTask);
        }));
        //como foram adicionadas novas tasks a viagem, é preciso dar um save()
        await travel.save();

        return res.status(200).json({ travel });
    } catch (error) {
        return res.status(400).json({ error: 'Error creating new travel.' })
    };
};

exports.updateTravelId = async (req, res) => {
    try { 
        const { title, description, destiny, tasks } = req.body;

        const travel = await Travel.findByIdAndUpdate(req.params.travelId, {
            title, 
            description, 
            destiny,
        //por padrão o mongoose retorna o objeto antigo
        //com "new: true", ele retorna o objeto atualizado 
        }, { new: true });

        //deletando as tasks associadas ao projeto antes de cria-las novamente
        travel.tasks = [];
        await Task.remove({ travel: travel._id });

        //cria novamente
        await Promise.all(tasks.map( async task => {

            const travelTask = new Task({ ...task, travel: travel._id });

            await travelTask.save(); 
            
            travel.tasks.push(travelTask);
        }));
  
        await travel.save();

        return res.status(200).json({ travel });
    } catch (error) {
        return res.status(400).send({ error: 'Error updating travel.' })
    };
};

exports.deleteTravelId = async (req, res) => {
    try {
        await Travel.findByIdAndRemove(req.params.travelId);

        return res.status(200).json({ message: 'Travel removed successfully.' });
    } catch (error) {
        return res.status(400).json({ error: 'Error deleting travel.' })
    }
};
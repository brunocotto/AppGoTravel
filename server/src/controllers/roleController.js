const Role = require('../models/Role');

exports.listRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        //se tudo ocorrer bem, retorna um json das viagens cadastradas
        return res.status(200).json({ roles });
    } catch (error) {
        return res.status(400).json({ error: 'Error loading roles.' })
    }
};

exports.createRole = async (req, res) => {
    try { 
        const { name, description } = req.body;

        //adicionando o usuário que criou a viagem pegando o userId que vem através do token
        //preenchido pelo middleware de auth
        const role = await Role.create({ name, description, user: req.userId });

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
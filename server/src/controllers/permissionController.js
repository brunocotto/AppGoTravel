const Permission = require('../models/Permission');

exports.listPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find();
        //se tudo ocorrer bem, retorna um json das viagens cadastradas
        return res.status(200).json({ permissions });
    } catch (error) {
        return res.status(400).json({ error: 'Error loading permissions.' })
    }
};

exports.createPermission = async (req, res) => {
    try { 
        const { name, description } = req.body;

        //adicionando o usuário que criou a viagem pegando o userId que vem através do token
        //preenchido pelo middleware de auth
        const permission = await Permission.create({ name, description });

        return res.status(200).json({ permission });
    } catch (error) {
        return res.status(400).json({ error: 'Error creating new permission.' })
    };
};
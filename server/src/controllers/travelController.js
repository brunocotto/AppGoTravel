const express = require('express');
const Travel = require('../models/Travel');
const Task = require('../models/Task');

exports.listTravel = async (req, res) => {
    try {
        //O Método find retorna uma array com todos os documentos que foram encontrados
        //populate(), permite fazer referência a documentos em outras collections
        //nesse caso busquei todos os dados da collection user
        const travels = await Travel.find().populate('user');
        //se tudo ocorrer bem, retorna um json das viagens cadastradas
        return res.status(200).json({ travels });
    } catch (error) {
        return res.status(400).json({ error: 'Error loading travels.' })
    }
}

exports.listTravelId = async (req, res) => {
    try {
        const travel = await Travel.findById(req.params.travelId).populate('user');

        return res.status(200).json({ travel });
    } catch (error) {
        return res.status(400).json({ error: 'Error loading travel.' })
    }
}

exports.createTravel = async (req, res) => {
    try { //adicionando o usuário que criou a viagem pegando o userId que vem através do token
          //preenchido pelo middleware de auth
        const travel = await Travel.create({ ...req.body, user: req.userId });

        return res.send({ travel });
    } catch (error) {
        return res.status(400).send({ error: 'Error creating new travel.' })
    }
}

exports.updateTravelId = async (req, res) => {
    try {
        const travel = await Travel.findByIdAndUpdate(req.params.travelId);

        return res.status(200).json({ travel });
    } catch (error) {
        return res.status(400).json({ error: 'Error loading travel.' })
    }
}

exports.deleteTravelId = async (req, res) => {
    try {
        await Travel.findByIdAndRemove(req.params.travelId);

        return res.status(200).json({ message: 'Travel removed successfully.' });
    } catch (error) {
        return res.status(400).json({ error: 'Error deleting travel.' })
    }
}
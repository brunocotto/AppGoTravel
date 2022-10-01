const express = require('express');
const Travel = require('../models/Travel');
const Task = require('../models/Task');

exports.listTravel = async (req, res) => {
    try {
        const travels = await Travel.find();

        return res.send({ travels });
    } catch (error) {
        return res.status(400).send({ error: 'Error loading travels' })
    }
}

exports.listTravelId = async (req, res) => {
    res.send({ user: req.userId });
}

exports.createTravel = async (req, res) => {
    try {
        const travel = await Travel.create(req.body);

        return res.send({ travel });
    } catch (error) {
        return res.status(400).send({ error: 'Error creating new travel' })
    }
}

exports.updateTravelId = async (req, res) => {
    res.send({ user: req.userId });
}

exports.deleteTravelId = async (req, res) => {
    res.send({ user: req.userId });
}
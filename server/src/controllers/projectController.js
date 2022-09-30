const express = require('express');
const Travel = require('..models/Travel');
const Task = require('..models/Task');

exports.listTravel = async (req, res) => {
    res.send({ user: req.userId });
}

exports.listTravelId = async (req, res) => {
    res.send({ user: req.userId });
}

exports.createTravel = async (req, res) => {
    res.send({ user: req.userId });
}

exports.updateTravelId = async (req, res) => {
    res.send({ user: req.userId });
}
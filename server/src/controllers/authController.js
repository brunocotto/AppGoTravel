const express = require('express');

const User = require('../models/User');

const router = express.Router();

//rota que registra usuários
router.post('/register', async(req, res) => {
    try {
        const user = await User.create(req.body);

        return res.send({ user });
    } catch (error) {
        return res.status(400).send({ error: 'Resistration failed'});
    }
});


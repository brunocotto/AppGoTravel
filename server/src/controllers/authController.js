const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//funcão registro de usuários
exports.register = async (req, res) => {
    
    const { name, email, password } = req.body;

    // validations
    if (!name) {
        res.status(422).json({ error: 'Name is required.' });
        return
    }

    if (!email) {
        res.status(422).json({ error: 'Email is required.' });
        return
    }

    if (!password) {
        res.status(422).json({ error: 'Password is required.' });
        return
    }
    //o user já existe?
    const userExists = await User.findOne({ email: email })

    if (userExists) {
        res.status(422).json({ msg: 'Email exist.' });
        return
    }

    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const user = new User({
        name,
        email,
        password: passwordHash,
    })
    
    // se tudo der certo salva o usuário no banco e retorna status 201
    try {
        await user.save()

        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.log(error)

        res.status(400).json({ error: 'Registration failed'});
    }
};


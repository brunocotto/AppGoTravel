const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config({path:"./.env"})

exports.checkUserID = async(req, res) => {
    const id = req.params.id

    //check if user exists
    const user = await User.findById(id, '-password')

    if(!user) {
        res.status(404).json({ msg: 'User not a found.' });
        return
    }

    res.status(200).json({ user });
}

//funcão registro de usuários
exports.register = async (req, res) => {
    //desestructured
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
    if (await User.findOne({ email: email })) {
        res.status(422).json({ msg: 'User already exists.' });
        return
    }

    // create hash password
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

        //res.status(201).json({ message: 'User created successfully.' });
        res.send({ user });
    } catch (error) {
        console.log(error)

        res.status(400).json({ error: 'Registration failed'});
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // validations
    if (!email || !password) {
        res.status(422).json({ error: 'Email or password is invalid.' });
        return
    }

    // check if user exists envio o password apenas para checkar as if password:password
    const user = await User.findOne({ email: email }).select('+password')

    if (!user) {
        res.status(422).json({ message: 'User not a found.' });
        return
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        res.status(422).json({ error: 'Password invalid.' });
        return
    }

    try {
        const secret = process.env.SECRET;

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        )

        res.status(200).json({ message: 'Authentication performed successfully.', token });
    } catch (error) {
        console.log(error)

        res
            .status(500)
            .json({ msg: error })
    }

}

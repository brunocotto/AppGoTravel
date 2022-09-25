const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const mailer = require('../modules/mailer')
require("dotenv").config({path:"./.env"})

//gera token
function generateToken(params = {}) {
    const secret = process.env.SECRET;

    return jwt.sign(params, secret, {
        //expira em um dia
        expiresIn: 86400,
    });   
};

//funcão registro de usuários
exports.register = async (req, res) => {
    //desestructured
    const { name, email, password } = req.body;

    // validations
    if (!name) {
        res.status(400).json({ error: 'Name is required.' });
        return
    }

    if (!email) {
        res.status(400).json({ error: 'Email is required.' });
        return
    }

    if (!password) {
        res.status(400).json({ error: 'Password is required.' });
        return
    }
    //o user já existe?
    if (await User.findOne({ email: email })) {
        //A requisição está bem formada mas inabilitada para ser seguida devido a erros semânticos.
        res.status(200).json({ msg: 'User already exists.' });
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

        //não retornoo password
        user.password = undefined;

        //res.status(201).json({ message: 'User created successfully.' });
        res.send({ 
            user,
            token: generateToken({ id: user._id })
         });
    } catch (error) {
        console.log(error)

        res.status(400).json({ error: 'Registration failed'});
    }
};

exports.authenticate = async (req, res) => {
    const { email, password } = req.body;

    // validations
    if (!email || !password) {
        res.status(400).json({ error: 'Email or password is invalid.' });
        return
    }

    // check if user exists envio o password apenas para checkar as if password:password
    const user = await User.findOne({ email: email }).select('+password')

    if (!user) {
        res.status(400).json({ error: 'User not a found.' });
        return
    }

    // check if password match
    if (!await bcrypt.compare(password, user.password)) {
        res.status(400).json({ error: 'Invalid password.' });
        return
    }

    user.password = undefined;

    try {
        res.status(200).json({ 
            user,
            token: generateToken({ id: user._id })
         });
    } catch (error) {
        console.log(error)

        res.status(500).json({ msg: error })
    }

}

exports.forgot_password = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email })

    if(!user) {
        res.status(400).json({ error: 'User not a found.' });
        return
    }

    //criado um token ramdomico de 20 carac hexa
    const token = crypto.randomBytes(20).toString('hex')

    //configuração do tempo de expiração. 1 hora após a criação
    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
        '$set': {
            passwordResetToken: token,
            passwordResetExpires: now,
        }
    })

    mailer.sendMail({
        to: email,
        from: 'bruno16@gotravel.com.br',
        template:'../modules/forgot_password',
        context: { token },
    }, (err) => {
        if(err) {
            return res.status(400).send({ error: 'Cannot send forgot password email.' })
        return res.send(200)
        }     
    })

    try {
       
        
    } catch (error) {
        res.status(400).send({ error: 'Erro on forgot password.' })
    }

}
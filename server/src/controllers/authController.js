const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const transport = require('../modules/mailer');
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
        //A requisição está bem formada.
        res.status(400).json({ msg: 'User already exists.' });
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

        //não retorna o password
        user.password = undefined;

        //res.status(201).json({ message: 'User created successfully.' });
        res.json({ 
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

    // check if user existe, envio o password apenas para checkar as if password:password
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

    //criado um token ramdomico
    const token = crypto.randomBytes(20).toString('hex')
    0
    

    //configuração do tempo de expiração. 1 hora após a criação
    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user._id, {
        '$set': {
            passwordResetToken: token,
            passwordResetExpires: now,
        }
    });

    transport.sendMail({
        title: 'Testando Recuperação de Senha',
        to: email,
        from: 'Profs@gotravel.com.br',
        template:'auth/forgot_password',
        context: { token },
    }, (err) => {
        if(err){ 
        //  console.log(err)
            return res.status(401).json({ error: 'Cannot send forgot password or email.' })
        }
        return res.send(200);          
    });
}

exports.reset_password = async (req, res) => {
    const { email, token, password } = req.body;

    try {
        const user = await User.findOne({ email })
        //apenas nessse ponto adiciona passwordResetToken e passwordResetExpires
        //config do próprio mongoose 
        .select('+passwordResetToken passwordResetExpires');

        if(!user) {
            res.status(400).json({ error: 'User not a found.' });
            return
        };
        // verifica se o token = token no passwordResetToken
        if(token !== user.passwordResetToken) {
            return res.status(400).json({ error: 'Token invalid.' });
        };
        // verifica se o token expirou
        const now = new Date()
        if (now > user.passwordResetExpires) {
            return res.status(400).json({ error: 'Token expired.' });
        };

        //altera o password
        user.password = password;

        await user.save();

        res.send(200)
        
    } catch (error) {
       return res.status(400).json({ error: 'Cannot send forgot password email.' });
    };
}
const jwt = require('jsonwebtoken');
require("dotenv").config({path:"./.env"})

//testes realizados
// sem nada no header
// Authorization hjkdshdkda
// Authorization Bearer dhasuhdhasd
// Authorization Bearer <token> ok

module.exports = (req, res, next) => {
    //Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ error: 'No token provided.' });

    const parts = authHeader.split(' ');

    if(!parts.lenght === 2)
        return res.status(401).send({ error: 'Token error.' });
    
    const [ scheme, token ] = parts;

    //regex - i case insensitive
    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformatted.' });
    }

    const secret = process.env.SECRET;
    //verifico se o token da req = hash da aplicação
    jwt.verify(token, secret, (err, decoded) => {
        if(err)
        return res.status(401).send({ error: 'Invalid token.' });

        // incluindo Id para as próximas reqs do controller
        req.userId = decoded.id;
        return next()
    });
}
const path = require('path');
const nodemailer = require('nodemailer');

//destruturando arquivo de config
const { host, port, user, pass } = require('../config/mail.json');

//permite o trabalho com templates de emails
const hbs = require('nodemailer-express-handlebars');

//transport route configuration
const transport = nodemailer.createTransport({
    host,
    port,
//  logger: true,
//  debug: true,
    auth: {
        user,
        pass,
    },
});

const handlebarOptions = {
    viewEngine: {
        extName: ".html",
        partialsDir: path.resolve('./src/resources/mail'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./src/resources/mail'),
    extName: ".html",
};

transport.use('compile', hbs(handlebarOptions));

module.exports = transport;
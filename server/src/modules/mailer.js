const path = require('path')
const nodemailer = require('nodemailer');
const { host, port, user, pass } = require("dotenv").config({path:"./.env"});
//permite o trabalho com templates de emails
const hbs = require('nodemailer-express-handlebars');

//nodemailer configuration - padrão https://mailtrap.io/
const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
  });

  transport.use('compile', hbs({
    //padrão handlebars
    viewEngine: 'handlebars',
    //onde ficam as views de template de email
    viewPath: path.resolve('./src/resources/mail'),
    //extensão
    extName: '.html'
  }))

  module.exports = transport;
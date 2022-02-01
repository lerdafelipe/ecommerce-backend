const nodemailer = require('nodemailer');

//Constantes
const {GMAIL_PASSWORD, MAIL_OWNER} = require('../config');

//Create the nodemailer transporter for gmail
const transporterG = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'felipelerdad@gmail.com',
        pass: `${GMAIL_PASSWORD}`
    }
});

//Set the contento of the mail with variables
const mailOptionsG = (user)=>{
    return {
        from: 'Servidor Node.js',
        to: [`${MAIL_OWNER}`],
        subject: `Nuevo registro`,
        html: `<h1 style="color: blue;">Datos nuevo usuario</h1>
                <ul>
                    <li>email:${user.email}</li>
                    <li>phone:${user.phone}</li>
                    <li>username:${user.username}</li>
                    <li>direccion:${user.direccion}</li>
                </ul>`
    }
};

//Export the modules to use in another component
module.exports={
    transporterG,
    mailOptionsG
};
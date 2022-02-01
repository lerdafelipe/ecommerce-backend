// config.js
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});


module.exports = {
    NODE_ENV:process.env.NODE_ENV || 'development',
    MONGO_ATLAS_PASS: process.env.MONGO_ATLAS_PASS,
    PORT: process.env.PORT || 8080,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    PHONE_NUMBER: process.env.PHONE_NUMBER,
    MAIL_OWNER: process.env.MAIL_OWNER,
    accountSid: process.env.accountSid,
    authToken: process.env.authToken,
    PERS: process.env.PERS
}
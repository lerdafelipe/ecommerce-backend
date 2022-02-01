const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    direccion: {type: String, required: true},
    edad: {type: Number, required: true},
    phone: {type: Number, required: true},
    avatar: {type: String, required: true},
    password: {type: String, required: true}
}, {versionKey: false});

module.exports = model('users', userSchema);
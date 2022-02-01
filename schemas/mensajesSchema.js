const {Schema, model} = require('mongoose');

const mensajesSchema = new Schema({
    author: {type: String, required: true},
    texto: {type: String, required: true}
}, {versionKey: false});

module.exports = model('mensajes', mensajesSchema);
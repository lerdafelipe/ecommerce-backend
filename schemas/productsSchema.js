const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    nombre: {type: String, required: true},
    categoria: {type: String, required: true},
    stock: {type: Number, required: true},
    precio: {type: Number, required: true}
}, {versionKey: false});

module.exports = model('productos', productSchema);
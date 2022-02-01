const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    items: {type: Array, required: true},
    author: {type: Array, required: true}
}, {versionKey: false});

module.exports = model('orders', orderSchema);
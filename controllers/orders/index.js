let getOrders 
let getOneOrder
let postOrder
let putOrder
let deleteOrder

const {PERS} = require('../../config')

switch (PERS) {
    case 'json':
        getOrders = require('./ordersControllerJson').getOrders;
        getOneOrder = require('./ordersControllerJson').getOneOrder;
        postOrder = require('./ordersControllerJson').postOrder;
        putOrder = require('./ordersControllerJson').putOrder;
        deleteOrder = require('./ordersControllerJson').deleteOrder;

        break

    case 'mongodb':
        getOrders = require('./ordersControllerMongo').getOrders;
        getOneOrder = require('./ordersControllerMongo').getOneOrder;
        postOrder = require('./ordersControllerMongo').postOrder;
        putOrder = require('./ordersControllerMongo').putOrder;
        deleteOrder = require('./ordersControllerMongo').deleteOrder;

        break

    case 'memory':
        getOrders = require('./ordersControllerMem').getOrders;
        getOneOrder = require('./ordersControllerMem').getOneOrder;
        postOrder = require('./ordersControllerMem').postOrder;
        putOrder = require('./ordersControllerMem').putOrder;
        deleteOrder = require('./ordersControllerMem').deleteOrder;

        break

    default:
        getOrders = require('./ordersControllerMongo').getOrders;
        getOneOrder = require('./ordersControllerMongo').getOneOrder;
        postOrder = require('./ordersControllerMongo').postOrder;
        putOrder = require('./ordersControllerMongo').putOrder;
        deleteOrder = require('./ordersControllerMongo').deleteOrder;

        break
}

module.exports = { getOrders, getOneOrder, postOrder, putOrder, deleteOrder };
const express = require('express');
//Router
const router = express.Router();
//Controllers
const {getOrders, getOneOrder, postOrder, putOrder, deleteOrder} = require('../controllers/orders/index');

//Route to return the orders
router.get('/', getOrders);

//Route to return only one order
router.get('/:id', getOneOrder);

//Route to upload one order
router.post('/', postOrder);

//Route to update one order
router.put('/:id', putOrder);

//Route to delete one order
router.delete('/:id', deleteOrder);

module.exports = router;
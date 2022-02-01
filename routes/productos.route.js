const express = require('express');
//Router
const router = express.Router();
//Controllers
const {getProducts, getOneProduct, postProduct, putProduct, deleteProduct} = require('../controllers/products/index');


//Route to return all products
router.get('/', getProducts);

//Route to return only one product
router.get('/:id', getOneProduct);

//Route to upload one product
router.post('/', postProduct);

//Route to update one product
router.put('/:id', putProduct);

//Route to delete one product
router.delete('/:id', deleteProduct);

module.exports = router;
let getProducts
let getOneProduct
let postProduct
let putProduct
let deleteProduct

const {PERS} = require('../../config')

switch (PERS) {
    case 'json':
        getProducts = require('./productsControllerJson').getProducts;
        getOneProduct = require('./productsControllerJson').getOneProduct;
        postProduct = require('./productsControllerJson').postProduct;
        putProduct = require('./productsControllerJson').putProduct;
        deleteProduct = require('./productsControllerJson').deleteProduct;
        console.log('DB JSON');

        break

    case 'mongodb':
        getProducts = require('./productsControllerMongo').getProducts;
        getOneProduct = require('./productsControllerMongo').getOneProduct;
        postProduct = require('./productsControllerMongo').postProduct;
        putProduct = require('./productsControllerMongo').putProduct;
        deleteProduct = require('./productsControllerMongo').deleteProduct;
        console.log('DB MongoDB');

        break

    case 'memory':
        getProducts = require('./productsControllerMem').getProducts;
        getOneProduct = require('./productsControllerMem').getOneProduct;
        postProduct = require('./productsControllerMem').postProduct;
        putProduct = require('./productsControllerMem').putProduct;
        deleteProduct = require('./productsControllerMem').deleteProduct;
        console.log('DB Memory');

        break

    default:
        getProducts = require('./productsControllerMongo').getProducts;
        getOneProduct = require('./productsControllerMongo').getOneProduct;
        postProduct = require('./productsControllerMongo').postProduct;
        putProduct = require('./productsControllerMongo').putProduct;
        deleteProduct = require('./productsControllerMongo').deleteProduct;
        console.log('DB MongoDB');

        break
}

module.exports = { getProducts, getOneProduct, postProduct, putProduct, deleteProduct }
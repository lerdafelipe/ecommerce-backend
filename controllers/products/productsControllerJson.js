const fs = require('fs');

//Function to get all products
const getProducts = async (req, res)=>{
    await fs.readFile('./controllers/DB/products.json', (err, data)=>{
        if (err) throw err
        else res.json(JSON.parse(data))
    });
};

//Function to get only one product
const getOneProduct = async (req, res)=>{
    //We get the id of the params and we search a document in the collection products with that id
    const {id} = req.params;
    await fs.readFile('./controllers/DB/products.json', (err, data)=>{
        if (err) throw err;
        else {
            const products = JSON.parse(data);
            const product = products.find(o => o._id == id);
            //return the product finded
            res.json(product);
        }
    });
};

//Funtion to upload a product
const postProduct = async (req, res)=>{
    await fs.readFile('./controllers/DB/products.json', async(err, data)=>{
        if (err) throw err;
        else {
            const products = JSON.parse(data);
            let newId
            if (products.length == 0) {newId = 1} 
            else {newId = products[products.length - 1]._id + 1}
            const newProduct = {...req.body, _id: newId}
            products.push(newProduct);
            await fs.writeFile('./controllers/DB/products.json', JSON.stringify(products, null, 2), (err, result)=>{
                if (err) throw err;
                else res.json(newProduct); 
            });
        }
    });
};

//Funtion to update one product
const putProduct = async (req, res)=>{
    const {id} = req.params;
    await fs.readFile('./controllers/DB/products.json', async(err, data)=>{
        if (err) throw err;
        else {
            const products = JSON.parse(data);
            const index = products.findIndex(o => o._id == id);
            if (index == -1) { throw new Error(`Error al actualizar: no se encontró el id ${id}`) }
            else {
                products[index] = req.body;
                await fs.writeFile('./controllers/DB/products.json', JSON.stringify(products, null, 2), (err, result)=>{
                    if (err) throw err;
                    else res.json(products[index]); 
                });
            }
        }
    });
};

//Funtion to delete one product
const deleteProduct = async (req, res)=>{
    const {id} = req.params;
    await fs.readFile('./controllers/DB/products.json', async(err, data)=>{
        if (err) throw err;
        else {
            let products = JSON.parse(data);
            const index = products.findIndex(o => o._id == id);
            if (index == -1) { throw new Error(`Error al borrar: no se encontró el id ${id}`) }
            else {
                products = products.filter(p => p._id != id);
                await fs.writeFile('./controllers/DB/products.json', JSON.stringify(products, null, 2), (err, result)=>{
                    if (err) throw err;
                    else res.json({state: 'Product deleted'}); 
                });
            }
        }
    });
};


module.exports = {
    getProducts, 
    getOneProduct, 
    postProduct, 
    putProduct, 
    deleteProduct
};
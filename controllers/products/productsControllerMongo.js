const productsSchema = require('../../schemas/productsSchema');


//Function to get all products
const getProducts = async (req, res)=>{
    //We search all products in the collection products
    const products = await productsSchema.find();
    //we return the array of products
    res.json(products);
};

//Function to get only one product
const getOneProduct = async (req, res)=>{
    //We get the id of the params and we search a document in the collection products with that id
    const {id} = req.params;
    const product = await productsSchema.find({_id: id});
    //return the product finded
    res.json(product);
};

//Funtion to upload a product
const postProduct = async (req, res)=>{
    //Set the product an save it in the DB
    const newProduct = new productsSchema(req.body);
    let productSave = await newProduct.save();
    //returns the product
    res.json(productSave);
};

//Funtion to update one product
const putProduct = async (req, res)=>{
    //Gets the id and the changes from req.
    const {id} = req.params;
    //Searchs the product and update the changes
    const product = await productsSchema.findByIdAndUpdate(id, {
        $set: req.body
    });
    //Get the product updated and return it
    const productUpdate = await productsSchema.find({_id: id});
    res.json(productUpdate[0]);
};

//Funtion to delete one product
const deleteProduct = async (req, res)=>{
    //Gets the id of the product to delete
    const {id} = req.params;
    //Deletes the product
    const product =  await productsSchema.findOneAndDelete({_id: id});
    //Returns the product deleted
    res.json(product);
};


module.exports = {
    getProducts, 
    getOneProduct, 
    postProduct, 
    putProduct, 
    deleteProduct
};

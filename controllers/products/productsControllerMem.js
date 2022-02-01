let Productos = [];


//Function to get all products
const getProducts = async (req, res)=>{
    res.json(Productos);
};

//Function to get only one product
const getOneProduct = async (req, res)=>{
    //We get the id of the params and we search a document in the collection products with that id
    const {id} = req.params;
    const product = Productos.find(o => o._id == id);
    //return the product finded
    res.json(product);
};

//Funtion to upload a product
const postProduct = async (req, res)=>{
    //Set the product an save it in the DB
    let newId
    if (Productos.length == 0) {newId = 1} 
    else {newId = Productos[Productos.length - 1]._id + 1}
    const newProduct = {...req.body, _id: newId}
    Productos.push(newProduct);

    res.json(newProduct);
};

//Funtion to update one product
const putProduct = async (req, res)=>{
    //Gets the id and the changes from req.
    const {id} = req.params;
    const index = Productos.findIndex(o => o._id == id);
    if (index == -1) { throw new Error(`Error al actualizar: no se encontró el id ${id}`) } 
    else {
        Productos[index] = req.body
        res.json(Productos[index])
    }
};

//Funtion to delete one product
const deleteProduct = async (req, res)=>{
    //Gets the id of the product to delete
    const {id} = req.params;

    const index = Productos.findIndex(o => o._id == id)
    if (index == -1) {
        throw new Error(`Error al borrar: no se encontró el id ${id}`)
    }else{
        Productos.filter(p => p._id != id);
        
        res.json({state: 'Product Deleted'});
    }
};


module.exports = {
    getProducts, 
    getOneProduct, 
    postProduct, 
    putProduct, 
    deleteProduct
};
const mongoose = require('mongoose');

//Constantes
const {MONGO_ATLAS_PASS} = require('../config');

const Connection = async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://felipe:${MONGO_ATLAS_PASS}@cluster0.u1fee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    } catch(error){
        throw new Error();
    }
}

module.exports = Connection;
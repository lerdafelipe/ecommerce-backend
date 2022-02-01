//Model mongoose
const mensajesSchema = require('../../schemas/mensajesSchema');

//Function to get all messages
const getMensajes = async (req, res)=>{
    //We search all messages in the collection messages
    const mensaje = await mensajesSchema.find();
    //we return the array of messages
    res.json(mensaje);
};

//Function to get only one message
const getOneMensaje = async (req, res)=>{
    //We get the id of the params and we search a document in the collection messages with that id
    const {id} = req.params;
    const mensaje = await mensajesSchema.findById(id);
    //return the message finded
    res.json(mensaje);
};

//Funtion to upload a message
const postMensaje = async (req, res)=>{
    //Gets the message of the body
    const mensaje = req.body;
    //Set the message an save it in the DB
    const newMensaje = new mensajesSchema(mensaje);
    const messageSaved = await newMensaje.save();
    //returns the message
    res.json(messageSaved);
};

//Funtion to update one message
const putMensaje = async (req, res)=>{
    //Gets the id and the changes from req.
    const {id} = req.params;
    const mensajeChange = req.body;
    //Searchs the messages and update the changes
    const mensajeUpdate = await mensajesSchema.updateOne({_id: id}, {
        $set: {mensajeChange}
    });
    //return the operation state
    res.json(mensajeUpdate);
};

//Funtion to delete on e message
const deleteMensaje = async (req, res)=>{
    //Gets the id of the message to delete
    const {id} = req.params;
    //Deletes the message
    const mensaje = await mensajesSchema.findOneAndDelete({_id: id});
    //Returns the message deleted
    res.json({mensaje: mensaje});
};


module.exports = {getMensajes, getOneMensaje, postMensaje, putMensaje, deleteMensaje};
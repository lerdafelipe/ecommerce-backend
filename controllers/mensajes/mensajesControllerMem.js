let Mensajes = [];

//Function to get all messages
const getMensajes = async (req, res)=>{
    res.json(Mensajes);
};

//Function to get only one message
const getOneMensaje = async (req, res)=>{
    //We get the id of the params and we search a document in the collection messages with that id
    const {id} = req.params;
    const mensaje = Mensajes.find(o => o._id == id);
    //return the message finded
    res.json(mensaje);
};

//Funtion to upload a message
const postMensaje = async (req, res)=>{
    //Gets the message of the body
    let newId
    if (Mensajes.length == 0) {newId = 1} 
    else {newId = Mensajes[Mensajes.length - 1]._id + 1}
    const newMensaje = {...req.body, _id: newId}
    Mensajes.push(newMensaje);
    res.json(newMensaje)
};

//Funtion to update one message
const putMensaje = async (req, res)=>{
    //Gets the id and the changes from req.
    const {id} = req.params;
    const index = Mensajes.findIndex(o => o._id == id);
    if (index == -1) { throw new Error(`Error al actualizar: no se encontró el id ${id}`) } 
    else {
        Mensajes[index] = req.body;
        res.json(Mensajes[index]);
    }
    
};

//Funtion to delete on e message
const deleteMensaje = async (req, res)=>{
    //Gets the id of the message to delete
    const {id} = req.params;
    //Deletes the message
    const index = Mensajes.findIndex(o => o._id == id)
    if (index == -1) {
        throw new Error(`Error al borrar: no se encontró el id ${id}`)
    }else{
        Mensajes.filter(p => p._id != id);
        res.json({state: 'Message deleted'})
    }
};


module.exports = {getMensajes, getOneMensaje, postMensaje, putMensaje, deleteMensaje};
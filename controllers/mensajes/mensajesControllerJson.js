const fs = require('fs');

//Function to get all messages
const getMensajes = async (req, res)=>{
    await fs.readFile('./controllers/DB/mensajes.json', (err, data)=>{
        if (err) throw err
        else res.json(JSON.parse(data))
    });
};

//Function to get only one message
const getOneMensaje = async (req, res)=>{
    //We get the id of the params and we search a document in the collection products with that id
    const {id} = req.params;
    await fs.readFile('./controllers/DB/mensajes.json', (err, data)=>{
        if (err) throw err;
        else {
            const mensajes = JSON.parse(data);
            const mensaje = mensajes.find(o => o._id == id);
            //return the mensaje finded
            res.json(mensaje);
        }
    });
};

//Funtion to upload a message
const postMensaje = async (req, res)=>{
    await fs.readFile('./controllers/DB/mensajes.json', async(err, data)=>{
        if (err) throw err;
        else {
            const mensajes = JSON.parse(data);
            let newId
            if (mensajes.length == 0) {newId = 1} 
            else {newId = mensajes[mensajes.length - 1]._id + 1}
            const newMensaje = {...req.body, _id: newId}
            mensajes.push(newMensaje);
            await fs.writeFile('./controllers/DB/mensajes.json', JSON.stringify(mensajes, null, 2), (err, result)=>{
                if (err) throw err;
                else res.json(newMensaje); 
            });
        }
    })
}

//Funtion to update one message
const putMensaje = async (req, res)=>{
    const {id} = req.params;
    await fs.readFile('./controllers/DB/mensajes.json', async(err, data)=>{
        if (err) throw err;
        else {
            const mensajes = JSON.parse(data);
            const index = mensajes.findIndex(o => o._id == id);
            if (index == -1) { throw new Error(`Error al actualizar: no se encontró el id ${id}`) }
            else {
                mensajes[index] = req.body;
                await fs.writeFile('./controllers/DB/mensajes.json', JSON.stringify(mensajes, null, 2), (err, result)=>{
                    if (err) throw err;
                    else res.json(mensajes[index]); 
                });
            }
        }
    });
};

//Funtion to delete on e message
const deleteMensaje = async (req, res)=>{
    const {id} = req.params;
    await fs.readFile('./controllers/DB/mensajes.json', async(err, data)=>{
        if (err) throw err;
        else {
            let mensajes = JSON.parse(data);
            const index = mensajes.findIndex(o => o._id == id);
            if (index == -1) { throw new Error(`Error al borrar: no se encontró el id ${id}`) }
            else {
                mensajes = mensajes.filter(p => p._id != id);
                await fs.writeFile('./controllers/DB/mensajes.json', JSON.stringify(mensajes, null, 2), (err, result)=>{
                    if (err) throw err;
                    else res.json({state: 'Message deleted'}); 
                });
            }
        }
    });
};


module.exports = {getMensajes, getOneMensaje, postMensaje, putMensaje, deleteMensaje};
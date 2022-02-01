let Orders = [];
//twilio
const {accountSid, authToken, PHONE_NUMBER, MAIL_OWNER} = require('../../constants');
//gmail
const transporterG = require('../../mail/gmail');

const twilio = require('twilio')
const client = twilio(accountSid, authToken);

//Function to get all orders
const getOrders = async (req, res)=>{
    res.json(Orders);
};

//Function to get only one order
const getOneOrder = async (req, res)=>{
     //We get the id of the params and we search a document in the collection orders with that id
    const {id} = req.params;
    const order = Orders.find(o => o._id == id)
    //return the message finded
    res.json(order);
};

//Function to upload a order
const postOrder = async (req, res)=>{
    //If the user is authenticated, wcontinues with the function
    if(req.session.passport.user !== undefined){
        //Set the ordes, user and author of the order
        const order = req.body;
        let author = order.author[0];
        let items = order.items;
        //Set the contento of the email to the user and the administrator
        let fragmentMail = '';
        for (let i of items) {fragmentMail += `<li>Producto:${i.title} - Cantidad ${i.cantidad} - Subtotal ${i.subtotal}</li>`}

        //Send a message with twilio with user data
        client.messages.create({
                body: `Nuevo Pedido de ${author.username}, ${author.email}`,
                from: `${PHONE_NUMBER}`,
                to: `${PHONE_NUMBER}`
            }
        ).then(message => console.log(message.sid)).catch(console.log(err));

        //Sends a emal to the owner with order details
        transporterG.sendMail({
                        from: 'Servidor Node.js',
                        to: [`${MAIL_OWNER}`],
                        subject: `Nuevo Pedido de ${author.username}, ${author.email}`,
                        html: `<h1 style="color: blue;">Nueva compra de ${author.username}</h1>
                                <ul>
                                    ${fragmentMail}
                                </ul>`
        }, (err, info) => {if(err) {console.log(err)}});

        //Set the order, save in th DB and return the order created
        let newId
        if (Orders.length == 0) {newId = 1} 
        else {newId = Orders[Orders.length - 1]._id + 1}
        const newOrder = {...req.body, _id: newId}
        Orders.push(newOrder);
        res.json(newOrder);
    }
};

//Funtion to update one order
const putOrder = async (req, res)=>{
    //Get the id from params and the changes from the body
    const {id} = req.params;
    const index = Orders.findIndex(o => o._id === id);
    Orders[index] = req.body;
    if (index == -1) { throw new Error(`Error al actualizar: no se encontró el id ${id}`) } 
    else {
        Orders[index] = req.body;
        res.json(Orders[index]);
    }
    
};

//Function to delete one order
const deleteOrder = async (req, res)=>{
    //Gets the id from params
    const {id} = req.params;
    //Serachs the order with that id and deletes from DB
    const index = Orders.findIndex(o => o._id == id)
    if (index == -1) { throw new Error(`Error al borrar: no se encontró el id ${id}`) }
    else{ 
        Orders.filter(p => p._id != id);
        res.json({state: "Order deleted"});
    }
};


module.exports = {getOrders, getOneOrder, postOrder, putOrder, deleteOrder};
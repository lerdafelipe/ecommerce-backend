const fs = require('fs');
//twilio
const {accountSid, authToken, PHONE_NUMBER, MAIL_OWNER} = require('../../config');
//gmail
const transporterG = require('../../mail/gmail');

const twilio = require('twilio')
const client = twilio(accountSid, authToken);

//Function to get all orders
const getOrders = async (req, res)=>{
    await fs.readFile('./controllers/DB/orders.json', (err, data)=>{
        if (err) throw err
        else res.json(JSON.parse(data))
    });
};

//Function to get only one order
const getOneOrder = async (req, res)=>{
    const {id} = req.params;
    await fs.readFile('./controllers/DB/orders.json', (err, data)=>{
        if (err) throw err;
        else {
            const orders = JSON.parse(data);
            const order = orders.find(o => o._id == id);
            //return the order finded
            res.json(order);
        }
    });
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

        await fs.readFile('./controllers/DB/orders.json', async(err, data)=>{
            if (err) throw err;
            else {
                const orders = JSON.parse(data);
                let newId
                if (orders.length == 0) {newId = 1} 
                else {newId = orders[orders.length - 1]._id + 1}
                const newOrder = {...req.body, _id: newId}
                orders.push(newOrder);
                await fs.writeFile('./controllers/DB/orders.json', JSON.stringify(orders, null, 2), (err, result)=>{
                    if (err) throw err;
                    else res.json(newOrder); 
                });
            }
        });
    }
};

//Funtion to update one order
const putOrder = async (req, res)=>{
    const {id} = req.params;
    await fs.readFile('./controllers/DB/orders.json', async(err, data)=>{
        if (err) throw err;
        else {
            const orders = JSON.parse(data);
            const index = orders.findIndex(o => o._id == id);
            if (index == -1) { throw new Error(`Error al actualizar: no se encontró el id ${id}`) }
            else {
                orders[index] = req.body;
                await fs.writeFile('./controllers/DB/orders.json', JSON.stringify(orders, null, 2), (err, result)=>{
                    if (err) throw err;
                    else res.json(orders[index]); 
                });
            }
        }
    });  
};

//Function to delete one order
const deleteOrder = async (req, res)=>{
    const {id} = req.params;
    await fs.readFile('./controllers/DB/orders.json', async(err, data)=>{
        if (err) throw err;
        else {
            let orders = JSON.parse(data);
            const index = orders.findIndex(o => o._id == id);
            if (index == -1) { throw new Error(`Error al borrar: no se encontró el id ${id}`) }
            else {
                orders = orders.filter(p => p._id != id);
                await fs.writeFile('./controllers/DB/orders.json', JSON.stringify(orders, null, 2), (err, result)=>{
                    if (err) throw err;
                    else res.json({state: 'order deleted'}); 
                });
            }
        }
    });
};


module.exports = {getOrders, getOneOrder, postOrder, putOrder, deleteOrder};
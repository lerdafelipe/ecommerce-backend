const express = require('express');
//Router
const router = express.Router();
//Controllers
const {getMensajes, getOneMensaje, postMensaje, putMensaje, deleteMensaje} = require('../controllers/mensajes/index');

//route to return all messages
router.get('/', getMensajes);

//Route to return only one message
router.get('/:id', getOneMensaje);

//Route to upload one message
router.post('/', postMensaje);

//Route to update one message
router.put('/:id', putMensaje);

//Ruta to delete one message
router.delete('/:id', deleteMensaje);

//export module messages route
module.exports = router;
let getMensajes 
let getOneMensaje
let postMensaje
let putMensaje
let deleteMensaje
 
const {PERS} = require('../../config')

switch (PERS) {
    case 'json':
        getMensajes = require('./mensajesControllerJson').getMensajes;
        getOneMensaje = require('./mensajesControllerJson').getOneMensaje;
        postMensaje = require('./mensajesControllerJson').postMensaje;
        putMensaje = require('./mensajesControllerJson').putMensaje;
        deleteMensaje = require('./mensajesControllerJson').deleteMensaje;

        break

    case 'mongodb':
        getMensajes = require('./mensajesControllerMongo').getMensajes;
        getOneMensaje = require('./mensajesControllerMongo').getOneMensaje;
        postMensaje = require('./mensajesControllerMongo').postMensaje;
        putMensaje = require('./mensajesControllerMongo').putMensaje;
        deleteMensaje = require('./mensajesControllerMongo').deleteMensaje;

        break

    case 'memory':
        getMensajes = require('./mensajesControllerMem').getMensajes;
        getOneMensaje = require('./mensajesControllerMem').getOneMensaje;
        postMensaje = require('./mensajesControllerMem').postMensaje;
        putMensaje = require('./mensajesControllerMem').putMensaje;
        deleteMensaje = require('./mensajesControllerMem').deleteMensaje;

        break

    default:
        getMensajes = require('./mensajesControllerMongo').getMensajes;
        getOneMensaje = require('./mensajesControllerMongo').getOneMensaje;
        postMensaje = require('./mensajesControllerMongo').postMensaje;
        putMensaje = require('./mensajesControllerMongo').putMensaje;
        deleteMensaje = require('./mensajesControllerMongo').deleteMensaje;

        break
}

module.exports = { getMensajes, getOneMensaje, postMensaje, putMensaje, deleteMensaje };
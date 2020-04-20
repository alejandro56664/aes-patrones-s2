const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    Usuario: require('../usuarios/usuario.model'),
    Catalogo: require('../catalogo/catalogo.model'),
    Cotizable: require('../catalogo/cotizable.model'),
    RFQ: require('../procesador-rfq/rfq.model'),
    Cotizacion: require('../procesador-rfq/cotizacion.model')
};
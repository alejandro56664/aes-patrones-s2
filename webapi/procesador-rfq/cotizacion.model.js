const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    idSolicitud: { type: String},
    idProveedor: { type: String},
    precio: { type: String},
    nombreProveedor:  { type: String},
    fechaCreacion: { type: Date, default: Date.now },

});

schema.set('toJSON', { virtuals: true });
schema.index( { idSolicitud: "text", idProveedor: "text" } )

module.exports = mongoose.model('Cotizacion', schema);
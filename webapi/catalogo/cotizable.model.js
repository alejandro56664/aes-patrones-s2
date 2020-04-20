const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    idCatalogo: { type: String},
    tipo: { type: String},
    titulo: { type: String},
    descripcion:  { type: String},
    codigo:  { type: String, unique: true, required: true },
    imagen:  { type: String},
    fecha_creacion: { type: Date, default: Date.now },
    fecha_modificacion: { type: Date, default: Date.now }

});

schema.set('toJSON', { virtuals: true });
schema.index( { titulo: "text", descripcion: "text" } )

module.exports = mongoose.model('Cotizable', schema);
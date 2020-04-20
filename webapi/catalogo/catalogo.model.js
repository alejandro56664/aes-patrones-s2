const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: { type: String, unique: true, required: true },
    tipo: { type: String},
    url_buscar: { type: String},
    url_cotizar: { type: String},
    fecha_modificacion: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Catalogo', schema);
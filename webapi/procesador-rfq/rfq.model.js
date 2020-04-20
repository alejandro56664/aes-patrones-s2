const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    idUsuario: {type: String},
    cantidad: { type: Number},
    cotizable: { type: String},
    fechaCreacion: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('RFQ', schema);
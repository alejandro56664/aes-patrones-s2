const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    idUsuario: {type: String},
    cantidad: { type: Number},
    cotizable:  { type: Schema.Types.ObjectId, ref: 'Cotizable' },
    fechaCreacion: { type: Date, default: Date.now },
    //cotizaciones: [{ type: Schema.Types.ObjectId, ref: 'Cotizacion' }]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('RFQ', schema);
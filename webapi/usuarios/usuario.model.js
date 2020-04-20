const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    celular: { type: String, required: true },
    tipo: { type: String, required: true },
    fecha_creacion: { type: Date, default: Date.now },
    fecha_modificacion: { type: Date, default: Date.now }

   // id: number;
   // token: string;

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Usuario', schema);
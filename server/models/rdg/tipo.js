const mongoose = require('mongoose');
const { Schema } = mongoose;

const tipoSchema = new Schema({
  nombre: { type: String, required: false},
  color: { type: String },
  tipo: { type: String }
},{
  versionKey: false
});

module.exports = mongoose.model('TipoReunion', tipoSchema, 'rdg.tipos');
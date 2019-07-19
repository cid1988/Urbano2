const mongoose = require('mongoose');
const { Schema } = mongoose;

const tipoSchema = new Schema({
  nombre: { type: String, required: false}
},{
  versionKey: false
});

module.exports = mongoose.model('TipoReunion', tipoSchema, 'rdg.tipos');
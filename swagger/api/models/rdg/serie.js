const mongoose = require('mongoose');
const { Schema } = mongoose;

const serieSchema = new Schema({
  para: [ Object ],
  cc: [ Object ],
  cco: [ Object ],
  exclusivos: [ Object ],
  usuario: { type: String },
  idInstancia: { type: String },
  asunto: { type: String },
  version: { type: String },
  mensajeHtml: { type: String },
  fecha: { type: String }
},{
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

serieSchema.virtual('color', {
  ref: 'TipoReunion', // The model to use
  localField: 'tipo', // Find people where `localField`
  foreignField: 'tipo', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});

module.exports = mongoose.model('Serie', serieSchema, 'rdg.reuniones');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const temarioSchema = new Schema({
    instancia:{type: String},
    tipoTemario: {type: String},
    html:{type: String},
    fecha: {type: String},
    usuario: {type: String},
    comentarios: {type: String},
    fechaComentarios: {type: String},
    propuestaEnviado:{
        fecha: {type: String},
        version: {type: String},
        para:[Object],
        cc:[Object],
        cco:[Object],
        exclusivos:[Object],
        asunto: {type: String},
        mensajeHtml: {type: String},
        usuario: {type: String},
    },
    enviado:{
        fecha: {type: String},
        version: {type: String},
        para:[Object],
        cc:[Object],
        cco:[Object],
        exclusivos:[Object],
        asunto: {type: String},
        mensajeHtml: {type: String},
        usuario: {type: String},
    }
},{
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});



module.exports = mongoose.model('Temario', temarioSchema, 'rdg.temarios');
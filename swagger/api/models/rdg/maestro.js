const mongoose = require('mongoose');
const { Schema } = mongoose;

const maestroSchema = new Schema({
    cita:{
        para:[Object],
        cc:[Object],
        cco:[Object],
        exclusivos:[Object],
    },
    frecuencia: {type: String},
    minuta:{
        para:[Object],
        cc:[Object],
        cco:[Object],
        exclusivos:[Object],
    },
    nombre:{ type: String },
    participantes: [ Object ],
    propuestaTemario:{
        para:[Object],
        cc:[Object],
        cco:[Object],
        exclusivos:[Object],
    },
    temario:{
        para:[Object],
        cc:[Object],
        cco:[Object],
        exclusivos:[Object],
    },
    tipo: {type: String}
},{
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

maestroSchema.virtual('color', {
  ref: 'TipoReunion', // The model to use
  localField: 'tipo', // Find people where `localField`
  foreignField: 'tipo', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});

module.exports = mongoose.model('Maestro', maestroSchema, 'rdg.reuniones');
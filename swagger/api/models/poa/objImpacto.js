const mongoose = require('mongoose');
const { Schema } = mongoose;

const objImpactoSchema = new Schema({
    nombre: { type: String, required: false},
    anio: { type: Number},
    responsableDeCarga: { type: String },
    eliminado: { type: Boolean },
    idPlan: { type: Schema.Types.ObjectId }
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

module.exports = mongoose.model('ObjImpacto', objImpactoSchema, 'poa.objsImpacto');
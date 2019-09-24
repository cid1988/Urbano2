const mongoose = require('mongoose');
const { Schema } = mongoose;

const proyectoSchema = new Schema({
//   _id: mongoose.Schema.Types.ObjectId;
  proyectoPadre: { type: String},
  codIdentificacion: { type: String },
  codPlanAnterior: { type: String },
  anioPlanAnterior: { type: String },
  proyectoInversion: { type: Boolean },
  cancelado: { type: Boolean },
  enPresentacion: { type: Boolean },
  dependencia: { type: String },
  contratista: { type: String },
  compromisoG: { type: String },
  metaCuantificacion: { type: String },
  metaProducto: { type: String },
  descripcion: { type: String },
  prioridadMinisterial: { type: String },
  fechaInicio: { type: String },
  monedaSolicitado: { type: String },
  presupuestoSolicitado: { type: String },
  prioridadJefatura: { type: String },
  fechaFin: { type: String },
  monedaGestion: { type: String },
  presupuestoGestion: { type: String },
  proyectoPrioritario: { type: Boolean },
  orden: { type: Number },
  grupo: { type: String },
  comunas: { type: [] },
  responsables: { type: [] },
  jurisdiccionesParticipantes: { type: [] },

  idPlan: { type: Schema.Types.ObjectId },
  idJurisdiccion: { type: Schema.Types.ObjectId },
  anio: { type: Number },
  eliminado: { type: Boolean }
},{
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

module.exports = mongoose.model('Proyecto', proyectoSchema, 'poa.proyectos');
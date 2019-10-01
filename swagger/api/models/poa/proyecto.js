const mongoose = require('mongoose');
const { Schema } = mongoose;


const proyectoSchema = new Schema({
    nombre: { type: String, required: false},
    codIdentificacion: { type: String, required: false},
    descripcion: { type: String, required: false},
    proyectoPadre: { type: String},
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
    comunas: { type: Array },
    responsables: { type: Array },
    jurisdiccionesParticipantes: { type: Array },
    responsableDeCarga: { type: String },
    fechaActualizacion: { type: String },
    usuarioActualizacion: { type: String },

    idAnterior: { type: String },
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
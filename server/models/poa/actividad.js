const mongoose = require('mongoose');
const { Schema } = mongoose;

const moment = require('moment');

const actividadSchema = new Schema({
    nombre: { type: String, required: false},
    fechas: { type: Array},
    cumplida: { type: Boolean},
    cancelada: { type: Boolean}
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

actividadSchema.virtual('color').get(function(){
    var fInicio = moment(this.fechas.slice(-1)[0].fechaInicio, "DD/MM/YYYY").format("YYYYMMDD");
    var fFin = moment(this.fechas.slice(-1)[0].fechaFin, "DD/MM/YYYY").format("YYYYMMDD");
    hoy = moment(new Date(), "DD/MM/YYYY").format("YYYYMMDD");

    if(this.cumplida){
        return 'blue';
    }else if(this.cancelada){
        return 'black';
    }else{
        if(fFin > hoy){
            if(Math.abs(moment(hoy).diff(fFin, 'days')) <= 5){
                return 'orange';
            }
            return 'green';
        }
        if(fFin <= hoy){
            if(Math.abs(moment(hoy).diff(fFin, 'days')) <= 5){
                return 'orange';
            }
            return 'red';
        }
    }
})

module.exports = mongoose.model('Actividad', actividadSchema, 'poa.actividades');
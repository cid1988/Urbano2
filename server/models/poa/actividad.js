const mongoose = require('mongoose');
const { Schema } = mongoose;

const moment = require('moment');

const actividadSchema = new Schema({
    nombre: { type: String },
    fechas: { type: [Object] },
    inicioCumplido: { type: Boolean},
    predecesor: { type: String },
    cumplida: { type: Boolean },
    cancelada: { type: Boolean },
    codIdentificacion: { type: String },
    etapa: { type: String },
    verEnDashboard: { type: Boolean },
    idProyecto: { type: String }
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

actividadSchema.virtual('color').get(function(){
    if(this.fechas.slice(-1)[0] && this.fechas.slice(-1)[0].fechaInicio && this.fechas.slice(-1)[0] && this.fechas.slice(-1)[0].fechaFin){
        var fInicio = moment(this.fechas.slice(-1)[0].fechaInicio, "DD/MM/YYYY").format("YYYYMMDD");
        var fFin = moment(this.fechas.slice(-1)[0].fechaFin, "DD/MM/YYYY").format("YYYYMMDD");
        hoy = moment(new Date(), "DD/MM/YYYY").format("YYYYMMDD");

        if(this.cancelada){//Actividad cancelada
            return "black";
        }
        if(this.inicioCumplido){//Inicio cumplido
            if(this.cumplida){//Inicio cumplido y final cumplido
                return "blue";
            }else{//Inicio cumplido y final no cumplido
                if(fFin > hoy){
                    if(Math.abs(moment(hoy).diff(fFin, 'days')) < 5){
                        return 'orange';//Final a 5 dias de vencerse
                    }
                    return 'green';//Final vigente
                }else if(fFin <= hoy){
                    return 'red';//Final vencido
                }
            }
        }else{//Inicio no cumplido
            if(this.cumplida){
                return "blue";//Final cumplido
            }
            if(fInicio > hoy){
                if(Math.abs(moment(hoy).diff(fInicio, 'days')) < 5){
                    return 'orange';//Inicio a 5 dias de vencerse
                }
                return 'green';//Inicio vigente
            }else if(fInicio <= hoy){
                return 'red';//Inicio vencido
            }
        }
    }
    return "grey";//Sin fecha de inicio ni fecha de final
})

module.exports = mongoose.model('Actividad', actividadSchema, 'poa.actividades');
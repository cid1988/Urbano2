const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const etapaSchema = new Schema({
    nombre: { type: String, required: false},
    orden: { type: String, required: false},
    idProyecto: { type: String, required: false}
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

etapaSchema.virtual('actividades', {
    ref: 'Actividad', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'etapa', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false
});

etapaSchema.virtual('color').get(function(){
    let color='green'
    if(this.actividades && this.actividades.length){
        for (let index = 0; index < this.actividades.length; index++) {

            if(this.actividades[index].color == 'red'){
                color=this.actividades[index].color
                return color;
            }
            if(this.actividades[index].color == 'blue'){
                color=this.actividades[index].color
            }else color='green'
        }
        return color;
    } return null
        
    
})

etapaSchema.virtual('fechas').get(function(){
    var fechas={fechaInicio:'',fechaFin:''};
    if(this.actividades && this.actividades.length){
        for (let index = 0; index < this.actividades.length; index++) {
            if(this.actividades[index].fechas.slice(-1)[0] && this.actividades[index].fechas.slice(-1)[0].fechaInicio){
                var fecha = moment(this.actividades[index].fechas.slice(-1)[0].fechaInicio, "DD/MM/YYYY").format("DD/MM/YYYY");
                fechas.fechaInicio = obtenerFecha(fechas.fechaInicio,fecha,'inicio')
            }
            if(this.actividades[index].fechas.slice(-1)[0] && this.actividades[index].fechas.slice(-1)[0].fechaFin){
                var fecha = moment(this.actividades[index].fechas.slice(-1)[0].fechaFin, "DD/MM/YYYY").format("DD/MM/YYYY");
                fechas.fechaFin = obtenerFecha(fechas.fechaFin,fecha,'fin')
            }
        }
        return fechas;
    }else return null
})

function obtenerFecha(fecha1,fecha2,tipo){
    if(fecha1==''){
        return fecha2;
    }else{
        if(tipo == 'inicio'){
            if(moment(fecha1).isBefore(fecha2)){
                return fecha2
            }else  return fecha1
        }
        if(tipo == 'fin'){
            if(moment(fecha1).isBefore(fecha2)){
                return fecha1
            }else  return fecha2
        }
    }
}



module.exports = mongoose.model('Etapa', etapaSchema, 'poa.etapas');
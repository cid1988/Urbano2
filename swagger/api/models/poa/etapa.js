const mongoose = require('mongoose');
const { Schema } = mongoose;

const etapaSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    nombre: { type: String, required: false},
    orden: { type: String, required: false},
    fechaInicio: { type: String, required: false},
    fechaFin: { type: String, required: false},
    idProyecto: { type: String, required: false}
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    strict: true
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
    if(!this.actividades) return "grey";

    if(this.actividades && this.actividades.length){
        return calcularColor(this.actividades);
    }else{
        return "grey";
    }
    


    // let color='green'
    // if(this.actividades && this.actividades.length){
    //     for (let index = 0; index < this.actividades.length; index++) {
    //         if(this.actividades[index].color == 'red'){
    //             color=this.actividades[index].color
    //             return color;
    //         }
    //         if(this.actividades[index].color == 'blue'){
    //             color=this.actividades[index].color
    //         }else color='green'
    //     }
    //     return color;
    // } return null
})

/*etapaSchema.virtual('fechas').get(function(){
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
*/

function calcularColor(actividades){
    let color = "";
    
    for (let i = 0; i < actividades.length; i++) {
        const ac = actividades[i].color;

        if(actividades[i].eliminado !== true){//Omitir los eliminados
            if(ac == "red"){
                color = "red";
                break;
            }else{
                if(ac == "white"){
                    if(color !== "orange"){
                        color = "white";
                        break;
                    }
                }
                if(ac == "grey"){
                    color = "grey";
                }
                if(ac == "green"){
                    if(color == "orange" || color == "grey"){
                        
                    }else{
                        color = "green";
                        break;
                    }
                }
                if(ac == "orange"){
                    color = "orange";
                    break;
                }
                if(ac == "blue"){
                    if(color == "green" || color == "orange" || color == "grey"){
                        
                    }else{
                        color = "blue"
                    }
                }
                
            }
        }
    }
    return color;
}


module.exports = mongoose.model('Etapa', etapaSchema, 'poa.etapas');
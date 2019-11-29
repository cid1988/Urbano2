const mongoose = require('mongoose');
const { Schema } = mongoose;

const proyectoSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
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

proyectoSchema.virtual('hijos', {//Cambiar el nombre por proyectosHijos
    ref: 'Proyecto',
    localField: '_id',
    foreignField: 'proyectoPadre',
    justOne: false
});

proyectoSchema.virtual('actividades', {
    ref: 'Actividad',
    localField: '_id',
    foreignField: 'idProyecto',
    justOne: false
});

proyectoSchema.virtual('color').get(function(){
    if(this.proyectoPadre && this.proyectoPadre.length){//Proyectos hijos
        if(!this.actividades) return "grey";
        return calcularColor(this.actividades);
    }else{//Proyectos padre
        if(this.hijos && this.hijos.length){//Proyecto padre con hijos
            let color = "";
            
            for (let i = 0; i < this.hijos.length; i++) {
                const hijo = this.hijos[i];
                
                color = calcularColor(hijo.actividades);
            }
            return color;
        }else{//Proyecto padre sin hijos
            if(this.actividades && this.actividades.length){
                return calcularColor(this.actividades);//Defino el color del proyecto padre a partir de todas sus actividades
            }else{
                return "white";
            }
        }
    }
})

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

module.exports = mongoose.model('Proyecto', proyectoSchema, 'poa.proyectos');
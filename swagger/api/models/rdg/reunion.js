const mongoose = require('mongoose');
const { Schema } = mongoose;

const reunionSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    reunion: { type: String },
    fecha: {type: String},
    desdeHora: { type: String },
    hastaHora: { type: String },
    desdeDate: { type: Number },
    hastaDate: { type: Number },
    usuarioCreacion: { type: String },
    fechaCreacion: { type: String },
    usuarioModificacion: { type: String },
    fechaModificacion: { type: String },
    ubicacion: {
        nombre: { type: String }
    },
    version: { type: String }
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

reunionSchema.virtual('_serie', {
  ref: 'Serie', // The model to use
  localField: 'reunion', // Find people where `localField`
  foreignField: '_id', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});

reunionSchema.virtual('title').get(function(){
    if(this._serie){
      return this._serie.nombre;
    }else return '';
    
});

reunionSchema.virtual('start').get(function(){
    return this.desdeDate;
});

reunionSchema.virtual('end').get(function(){
    return this.hastaDate;
});

reunionSchema.virtual('color').get(function(){
    if(!this._serie) return "";
    var data = calcularColor(this._serie.tipo);
    return data;
});

function calcularColor(reunion){
    if(!reunion) return "";
    if(reunion == "coordinacion"){
      return "rgb(91, 190, 136, 0.5)"
    }else if(reunion == "previa"){
      return "rgb(168, 85, 198, 0.5)";
    }else if(reunion == "seguimientoJefatura"){
      return "rgb(141, 98, 47, 0.5)";
    }else if(reunion == "especificasJefatura"){
      return "rgb(167, 167, 167, 0.5)";
    }else if(reunion == "seguimiento"){
      return "rgb(234, 111, 0, 0.5)";
    }else if(reunion == "especificas"){
      return "rgb(43, 130, 255, 0.5)";
    }else if(reunion == "visitaObra"){
      return "rgb(38, 84, 115, 0.5)";
    }else if(reunion == "eventual"){
      return "rgb(173, 172, 58, 0.5)";
    }else if(reunion == "poa"){
      return "#265473";
    }
};

module.exports = mongoose.model('Reunion', reunionSchema, 'rdg.reuniones.instancias');
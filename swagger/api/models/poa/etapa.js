const mongoose = require('mongoose');
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
    console.log(this.actividades.length)
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
})


module.exports = mongoose.model('Etapa', etapaSchema, 'poa.etapas');
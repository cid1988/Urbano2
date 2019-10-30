const mongoose = require('mongoose');
const { Schema } = mongoose;

const reunionSchema = new Schema({
    nombre: { type: String, required: false },
    reunion: { type: Schema.Types.ObjectId, ref: 'Serie' },
    desdeDate: { type: Number },
    hastaDate: { type: Number }
},{
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

reunionSchema.virtual('title').get(function(){
    return this.reunion.nombre;
});

reunionSchema.virtual('start').get(function(){
    return this.desdeDate;
});

reunionSchema.virtual('end').get(function(){
    return this.hastaDate;
});


module.exports = mongoose.model('Reunion', reunionSchema, 'rdg.reuniones.instancias');
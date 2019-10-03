const mongoose = require('mongoose');
const { Schema } = mongoose;

const compromisoGobiernoSchema = new Schema({
    nombre: { type: String, required: false},
    tipo: { type: String}
},{
    versionKey: false
});

module.exports = mongoose.model('CompromisoGobierno', compromisoGobiernoSchema, 'poa.compromisosgobierno');
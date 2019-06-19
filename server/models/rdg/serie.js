const mongoose = require('mongoose');
const { Schema } = mongoose;

const serieSchema = new Schema({
  nombre: { type: String, required: false}
},{
  versionKey: false
});

module.exports = mongoose.model('Serie', serieSchema, 'rdg.reuniones');
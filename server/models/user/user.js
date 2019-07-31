const mongoose = require('mongoose');
const { Schema } = mongoose;

var userSchema = new Schema({
  username: {type: String},
  password: {type: String},
  idContacto: { type: Schema.Types.ObjectId, ref: 'Contacto'},
  jurisdiccion: { type: Schema.Types.ObjectId, ref: 'Organigrama'}
},{
  versionKey: false
})

module.exports = mongoose.model('User', userSchema, 'users')
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Contacto= require('../contacto/contacto')
const Organigrama= require('../organigrama/organigrama')

var userSchema = new Schema({
  username: {type: String},
  password: {type: String},
  idContacto: { type: Schema.Types.ObjectId, ref: Contacto},
  jurisdiccion: { type: Schema.Types.ObjectId, ref: Organigrama}
},{
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

module.exports = mongoose.model('User', userSchema, 'users')
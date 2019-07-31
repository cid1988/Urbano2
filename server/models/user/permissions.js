const mongoose = require('mongoose');
const { Schema } = mongoose;

var userPermissionsSchema = new Schema({
  username: {type: String},
  permissions: {type: Array}
},{
  versionKey: false
})

module.exports = mongoose.model('PermisosUsuario', userPermissionsSchema, 'users.permissions')
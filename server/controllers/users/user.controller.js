const User = require('../../models/user/user');
const UserPermissions = require('../../models/user/permissions');
const passwordHash = require('password-hash');

const userCtrl = {};

userCtrl.getUsers = async (req,res,next) => {
  try{
    const users = await User.find()
    .populate([{
      path: 'idContacto',
      model: 'Contacto'
    }, {
      path: 'jurisdiccion',
      model: 'Organigrama'
    }]);
    res.json(users);
  }catch(error){
    res.json(error)
  }
};

userCtrl.getUserLogin = async (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;

  try{
    await User.find({username: username}, function(error,user){
      if(passwordHash.verify(password, user[0].password)){
        res.status(200).json(user[0]);
      }else{
        res.status(500)
      }
    });
  }catch(error){
    res.json(error)
  }
};

userCtrl.crearUsuario = async (req, res, next) => {
  const usuario = new User({
    username: req.body.username,
    password: req.body.password,
    jurisdiccion: req.body.jurisdiccion
  });
  await usuario.save();
  res.json({status: 'Usuario creado'});
};

userCtrl.getUserPermissions = async (req, res, next) => {
  const { username } = req.body;
  try{
    await UserPermissions.find({username: username}, function(error,permisos){
      res.status(200).json(permisos);
    });
  }catch(error){
    res.json(error)
  }
};

module.exports = userCtrl;
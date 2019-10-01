const User = require('../models/user/user');
const UserPermissions = require('../models/user/permissions');
const passwordHash = require('password-hash'); 

async function getUsers (req,res,next){
  try{
    const users = await User.find()
    .populate(['idContacto']);
    res.json(users);
  }catch(error){
    res.json(error)
  }
};

async function getUserLogin (req,res,next){
  const { username , password} = req.swagger.params.body.value

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

async function crearUsuario (req,res,next){
  const usuario = new User({
    username: req.body.username,
    password: req.body.password,
    jurisdiccion: req.body.jurisdiccion
  });
  await usuario.save();
  res.json({status: 'Usuario creado'});
};

async function getUserPermissions (req,res,next){
  const { username } = req.body;
  try{
    await UserPermissions.find({username: username}, function(error,permisos){
      res.status(200).json(permisos);
    });
  }catch(error){
    res.json(error)
  }
};

module.exports = {
 getUserLogin, getUserPermissions, getUsers, crearUsuario
};
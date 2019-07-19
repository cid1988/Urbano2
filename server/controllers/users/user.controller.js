const User = require('../../models/user/user');
const CryptoJS = require("crypto-js");
const passwordHash = require('password-hash');

const userCtrl = {};

// userCtrl.getUsers = async (req,res,next) => {
//   try{
//     await User.find(function(err,users){
//       res.status(200).send(users);
//     })
//   }catch(error){
//     res.json(error)
//   }
// };

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
        // res.status(500)
      }
    });
  }catch(error){
    res.json(error)
  }
  
};

module.exports = userCtrl;
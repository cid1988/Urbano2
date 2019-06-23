const User = require('../models/user');

const userCtrl = {};

userCtrl.getUsers = async (req,res,next) => {
  try{
    await User.find(function(err,users){
      res.status(200).send(users);
    })
  }catch(error){
    res.json(error)
  }
};

userCtrl.getUserLogin = async (req, res, next) => {
  const { username } = req.body;
  // const { password } = req.body;
  await User.find({username: username}, function(error,user){
    res.status(200).json(user[0]);
  });
};

module.exports = userCtrl;
const User = require('../models/user/user');
const passwordHash = require('password-hash'); 

async function login(req, res, next){
    const { username , password} = req.swagger.params.body.value
    console.log(username)
    console.log(password)
    try{
      await User.find({username: username}).lean().exec(function(err, user) {
        if(passwordHash.verify(password, user[0].password)){
          user[0].token='ApiOk'
          console.log(user[0])
          res.status(200).json(user[0]);
        }else {
          console.log('No ingreso')
          res.status(204)
        }
      });
    }catch(error){
      res.json(error)
    }
};

async function logout(req, res, next){
    res.json({body: true});
};

module.exports = {login, logout} ;
const User = require('../models/user/user');
const passwordHash = require('password-hash'); 
const jwt = require('jsonwebtoken');

async function login(req, res, next){
  const { username , password} = req.swagger.params.body.value
  try{
    await User.find({username: username}).lean().exec(function(err, user) {
      if(passwordHash.verify(password, user[0].password)){
        let user = {
          username: username,
          role: 'admin'
        }
      
        jwt.sign({user}, 'secketKey',  (err, token) => {
          res.status(200).json(token);
        });
        
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
const User = require('../models/user/user');
const passwordHash = require('password-hash'); 
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

async function login(req, res, next){
  try{
    const { username , password} = req.swagger.params.body.value
    var bytes  = CryptoJS.AES.decrypt(password.toString(), 'BAGestion%1234');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    User.find({username: username}).lean().exec(function(err, user) {
      if(err) {
        res.status(404).send(err)
      } else{
        if(user[0] && user[0].password){
          if(passwordHash.verify(plaintext, user[0].password)){
            let user = {
              username: username,
              role: 'admin'
            }
          
            jwt.sign({user}, 'secketKey',  (err, token) => {
              var data={
                token: token,
                username: user.username
              }
              res.status(200).json(data);
            });
            
          }else res.status(404).send('Usuario y/o contraseña incorrectos');
        }else res.status(404).send('Usuario y/o contraseña incorrectos');
      }
    });
  }catch(error){
    res.status(404).send(error)
  }
};

async function logout(req, res, next){
    res.json({body: true});
};

module.exports = {login, logout} ;
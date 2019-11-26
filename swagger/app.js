'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const mongoose = require('mongoose');
const URI = 'mongodb://localhost/bag2';
var jwt = require('jsonwebtoken');
var sharedSecret = 'secketKey';
//INTERFAZ DE USUARIO PARA APIS SWAGGER - DOCUMENTACION
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app; // for testing

var config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
    Bearer: function(req, security, token, next) {
      console.log(token)
      if (token && token.indexOf("Bearer ") == 0) {
        var tokenString = token.split(' ')[1];
        console.log('jwt Verificacion')
        jwt.verify(tokenString , sharedSecret, function (err, authData) {
          if(err) {
            next(err)
          } else { 
            req.token =  authData.token
            next()
          }
        });
      } else {
        //return the error in the callback if the Authorization header doesn't have the correct format
        next({error: 'No valido'})
      }
    }
  }
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  app.use(function (req, res, next) {
    if(req.file){
      req.files = req.file  
    }
    next();
  });
  swaggerExpress.register(app);
  var port = process.env.PORT || 10010;

  mongoose.connect(URI,{useNewUrlParser: true,useUnifiedTopology: true ,useFindAndModify: false })
    .then(db =>{
      console.log('db is connected')
      app.listen(port);
    } )
    .catch(err => console.error(err));
});

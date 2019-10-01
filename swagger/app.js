'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const mongoose = require('mongoose');
const URI = 'mongodb://localhost/bag2';

//INTERFAZ DE USUARIO PARA APIS SWAGGER - DOCUMENTACION
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app; // for testing

var config = {
  appRoot: __dirname, // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  mongoose.connect(URI,{useNewUrlParser: true,useUnifiedTopology: true ,useFindAndModify: false })
    .then(db =>{
      console.log('db is connected')
      app.listen(port);
    } )
    .catch(err => console.error(err));
});

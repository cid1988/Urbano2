const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

//const sequelize = new Sequelize('mariadb://root:netcat2025@localhost:3306/test');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.productos = require('../producto/producto.model.js')(sequelize, Sequelize);
db.ventas = require('../venta/venta.model.js')(sequelize, Sequelize);
 
 
module.exports = db;
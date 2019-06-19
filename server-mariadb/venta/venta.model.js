module.exports = (sequelize, Sequelize) => {
 
    const Venta = sequelize.define('venta', {
      productoId: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.INTEGER
      }
    });
    
    return Venta;
  }
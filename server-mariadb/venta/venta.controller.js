const db = require('../config/db.config.js');
const Venta = db.ventas;

// Post a Producto
exports.create = (req, res) => {  
  // Save to MariaDB database
  Venta.create({  
    productoId: req.body.productoId
  })
  .then(venta => {    
    // Send created producto to client
    res.json(venta);
  })
  .catch(error => res.status(400).send(error))
};
 
// Fetch all Customers
exports.findAll = (req, res) => {
  Venta.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] }
  })
  .then(ventas => {
    res.json(ventas);
  })
  .catch(error => res.status(400).send(error))
};
 
// Find a Customer by Id
exports.findById = (req, res) => {  
  Venta.findById(req.params.ventaId,
    {attributes: { exclude: ["createdAt", "updatedAt"] }}
  )
  .then(venta => {
    if (!venta){
      return res.status(404).json({message: "Producto no encontrado"})
    }
    return res.status(200).json(venta)
  })
  .catch(error => res.status(400).send(error));
};
 
exports.lookUpByPrecio = (req, res) => {
  console.log("LookUByPrecio");
  return Venta.findAll({
    where: {
      precio: req.params.precio
    },
    attributes: { exclude: ["createdAt", "updatedAt"] }
  })
  .then( ventas => {
    if(!ventas){
      return res.status(404).json({message: "Productos no encontrados"})
    }
    return res.status(200).json(ventas)
  })
  .catch(error => res.status(400).send(error));
}
 
// Update a Producto
exports.update = (req, res) => {
  return Venta.findById(req.params.ventaId).then(venta => {
    if(!venta){
      return res.status(404).json({
        message: 'Producto no encontrado',
      });
    }
    return venta.update({
      productoId: req.body.productoId
    })
    .then(() => res.status(200).json(venta))
    .catch((error) => res.status(400).send(error));
  })
  .catch((error) => res.status(400).send(error));       
};
 
// Delete a Producto by Id
exports.delete = (req, res) => {
  return Venta.findById(req.params.ventaId)
  .then(venta => {
    if(!venta) {
      return res.status(400).json({
        message: 'Producto no encontrado',
      });
    }
    return venta.destroy()
      .then(() => res.status(200).json({message: "Destroy successfully!"}))
      .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
};
 
exports.deleteAll = (req, res) => {
  return Venta.destroy({
    where: {},
    truncate: true
  })
  .then(() => res.status(200).json({message: "Todos los productos fueron eliminados!"}))
  .catch(error => res.status(400).send(error));
}
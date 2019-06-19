const db = require('../config/db.config.js');
const Producto = db.productos;

// Post a Producto
exports.create = (req, res) => {  
  // Save to MariaDB database
  Producto.create({  
    nombre: req.body.nombre,
    precio: req.body.precio
  })
  .then(producto => {    
    // Send created producto to client
    res.json(producto);
  })
  .catch(error => res.status(400).send(error))
};
 
// Fetch all Customers
exports.findAll = (req, res) => {
  Producto.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] }
  })
  .then(productos => {
    res.json(productos);
  })
  .catch(error => res.status(400).send(error))
};
 
// Find a Customer by Id
exports.findById = (req, res) => {  
  Producto.findById(req.params.productoId,
    {attributes: { exclude: ["createdAt", "updatedAt"] }}
  )
  .then(producto => {
    if (!producto){
      return res.status(404).json({message: "Producto no encontrado"})
    }
    return res.status(200).json(producto)
  })
  .catch(error => res.status(400).send(error));
};
 
exports.lookUpByPrecio = (req, res) => {
  console.log("LookUByPrecio");
  return Producto.findAll({
    where: {
      precio: req.params.precio
    },
    attributes: { exclude: ["createdAt", "updatedAt"] }
  })
  .then( productos => {
    if(!productos){
      return res.status(404).json({message: "Productos no encontrados"})
    }
    return res.status(200).json(productos)
  })
  .catch(error => res.status(400).send(error));
}
 
// Update a Producto
exports.update = (req, res) => {
  return Producto.findById(req.params.productoId).then(producto => {
    if(!producto){
      return res.status(404).json({
        message: 'Producto no encontrado',
      });
    }
    return producto.update({
      nombre: req.body.nombre,
      precio: req.body.precio
    })
    .then(() => res.status(200).json(producto))
    .catch((error) => res.status(400).send(error));
  })
  .catch((error) => res.status(400).send(error));       
};
 
// Delete a Producto by Id
exports.delete = (req, res) => {
  return Producto.findById(req.params.productoId)
  .then(producto => {
    if(!producto) {
      return res.status(400).json({
        message: 'Producto no encontrado',
      });
    }
    return producto.destroy()
      .then(() => res.status(200).json({message: "Destroy successfully!"}))
      .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
};
 
exports.deleteAll = (req, res) => {
  return Producto.destroy({
    where: {},
    truncate: true
  })
  .then(() => res.status(200).json({message: "Todos los productos fueron eliminados!"}))
  .catch(error => res.status(400).send(error));
}
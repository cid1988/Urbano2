module.exports = function(app) {
 
    const productos = require('./producto.controller.js');
 
    // Create a new Customer
    app.post('/api/productos/create', productos.create);
 
    // Retrieve all Customer
    app.get('/api/productos', productos.findAll);
 
    // Retrieve a single Customer by Id
    app.get('/api/productos/:productoId', productos.findById);
 
    app.get('/api/productos/precio/:precio', productos.lookUpByPrecio);
 
    // Update a Customer with Id
    app.put('/api/productos/:productoId', productos.update);
 
    // Delete a Customer with Id
    app.delete('/api/productos/:productoId', productos.delete);
 
    // Delete all Customers
    app.delete('/api/productos/all/delete', productos.deleteAll);
}
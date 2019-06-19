module.exports = function(app) {
 
    const ventas = require('./venta.controller.js');
 
    // Create a new Customer
    app.post('/api/ventas/create', ventas.create);
 
    // Retrieve all Customer
    app.get('/api/ventas', ventas.findAll);
 
    // Retrieve a single Customer by Id
    app.get('/api/ventas/:ventaId', ventas.findById);
 
    app.get('/api/ventas/precio/:precio', ventas.lookUpByPrecio);
 
    // Update a Customer with Id
    app.put('/api/ventas/:ventaId', ventas.update);
 
    // Delete a Customer with Id
    app.delete('/api/ventas/:ventaId', ventas.delete);
 
    // Delete all Customers
    app.delete('/api/ventas/all/delete', ventas.deleteAll);
}
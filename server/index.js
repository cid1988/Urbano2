const express = require('express');
const cors = require('cors');
const app = express();

const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());

// Routes
app.use('/api/contactos', require('./routes/contacto.routes'));
app.use('/api/poa.proyectos', require('./routes/proyectos.routes'));
app.use('/api/poa.actividades', require('./routes/actividades.routes'));
app.use('/api/obras', require('./routes/obras.routes'));
app.use('/api/poa.jurisdicciones', require('./routes/areas.routes'));
app.use('/api/poa.planes', require('./routes/planes.routes'));
app.use('/api/rdg', require('./routes/rdg/rdg.routes'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
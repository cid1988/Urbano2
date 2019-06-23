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
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/contactos', require('./routes/contacto.routes'));
app.use('/api/poa', require('./routes/poa/poa.routes'));
app.use('/api/rdg', require('./routes/rdg/rdg.routes'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
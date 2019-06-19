const express = require('express');
const router = express.Router();

const actividad = require('../controllers/actividades.controller');

router.post('/', actividad.getActividades);

module.exports = router;
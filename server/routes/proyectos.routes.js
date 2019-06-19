const express = require('express');
const router = express.Router();

const proyecto = require('../controllers/proyectos.controller');

router.post('/', proyecto.getProyectos);
router.post('/', proyecto.getEtapasPorProyecto);

module.exports = router;
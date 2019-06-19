const express = require('express');
const router = express.Router();

const etapa = require('../controllers/etapas.controller');

router.post('/', etapa.getEtapa);
router.post('/', etapa.getEtapas);

module.exports = router;
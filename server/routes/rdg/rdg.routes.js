const express = require('express');
const router = express.Router();

const reunion = require('../../controllers/rdg/rdg.controller');

router.get('/reuniones', reunion.getReuniones);
router.get('/maestroPorReunion/:idReunion', reunion.getMaestroPorReunion);
router.get('/series', reunion.getSeriesReuniones);
router.post('/nuevaReunion', reunion.crearReunion);
router.post('/actualizarReunion', reunion.updateReunion);

module.exports = router;
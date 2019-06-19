const express = require('express');
const router = express.Router();

const reunion = require('../../controllers/rdg/rdg.controller');

router.get('/reuniones', reunion.getReuniones);
router.get('/series', reunion.getSeriesReuniones);

module.exports = router;
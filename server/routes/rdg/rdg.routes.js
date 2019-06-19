const express = require('express');
const router = express.Router();

const reunion = require('../../controllers/rdg/rdg.controller');

router.get('/', reunion.getReuniones);

module.exports = router;
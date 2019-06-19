const express = require('express');
const router = express.Router();

const obras = require('../controllers/obras.controller');

router.post('/', obras.getObras);

module.exports = router;
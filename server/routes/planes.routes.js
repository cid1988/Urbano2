const express = require('express');
const router = express.Router();

const planes = require('../controllers/planes.controller');

router.get('/', planes.getPlanes);

module.exports = router;
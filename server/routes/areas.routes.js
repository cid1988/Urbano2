const express = require('express');
const router = express.Router();

const areas = require('../controllers/areas.controller');

router.get('/', areas.getAreas);
router.post('/', areas.getAreasPorPlan);

module.exports = router;
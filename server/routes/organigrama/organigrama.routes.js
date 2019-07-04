const express = require('express');
const router = express.Router();

const organigrama = require('../../controllers/organigrama/organigrama.controller');

router.get('/', organigrama.getOrganigrama);

module.exports = router;
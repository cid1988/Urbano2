const express = require('express');
const router = express.Router();

const user = require('../../controllers/users/user.controller');

router.get('/', user.getUsers);
router.post('/', user.getUserLogin);
router.post('/crear', user.crearUsuario);
router.post('/permisos', user.getUserPermissions);

module.exports = router;
const express = require('express');
const router = express.Router();

const contacto = require('../../controllers/contactos/contacto.controller');

router.get('/', contacto.getContactos);
router.post('/', contacto.crearContacto);
router.get('/:id', contacto.getContacto);
router.put('/:id', contacto.editContacto);
router.delete('/:id', contacto.deleteContacto);

module.exports = router;
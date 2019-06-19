const express = require('express');
const router = express.Router();

const poaCtrl = require('../../controllers/poa/poa.controller');

router.post('/actividades', poaCtrl.getActividades);
router.get('/areas', poaCtrl.getAreas);
router.post('/areas', poaCtrl.getAreasPorPlan);
router.post('/etapas', poaCtrl.getEtapas);
router.post('/etapas', poaCtrl.getEtapasPorProyecto);
router.post('/obras', poaCtrl.getObras);//Obras deberia estar fuera de poa
router.get('/planes', poaCtrl.getPlanes);
router.post('/proyecto', poaCtrl.getProyectoPorId);
router.post('/proyectos', poaCtrl.getProyectos);

module.exports = router;
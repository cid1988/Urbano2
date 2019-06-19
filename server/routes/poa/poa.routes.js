const express = require('express');
const router = express.Router();

const poaCtrl = require('../../controllers/poa/poa.controller');

router.post('/actividades', poaCtrl.getActividades);
router.get('/areas', poaCtrl.getAreas);
router.post('/areas', poaCtrl.getAreasPorPlan);
// router.post('/etapas', poaCtrl.getEtapa);
router.post('/etapas', poaCtrl.getEtapas);
router.post('/obras', poaCtrl.getObras);//Obras deberia estar fuera de poa
router.get('/planes', poaCtrl.getPlanes);
router.post('/proyecto', poaCtrl.getProyectoPorId);
router.post('/proyectos', poaCtrl.getProyectos);
router.post('/etapas', poaCtrl.getEtapasPorProyecto);

module.exports = router;
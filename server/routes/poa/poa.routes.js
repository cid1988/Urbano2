const express = require('express');
const router = express.Router();

const poaCtrl = require('../../controllers/poa/poa.controller');

router.get('/actividades/:idActividad', poaCtrl.getActividad);
router.post('/actividades', poaCtrl.getActividades);
router.post('/actividadesPorProyecto', poaCtrl.getActividadesPorProyecto);
router.post('/actividadesPorEtapa', poaCtrl.getActividadesPorEtapa);
router.get('/areas', poaCtrl.getAreas);
router.post('/areas', poaCtrl.getAreasPorPlan);
router.post('/etapas', poaCtrl.getEtapas);
router.post('/etapasPorProyecto', poaCtrl.getEtapasPorProyecto);
router.post('/obras', poaCtrl.getObras);//Obras deberia estar fuera de poa
router.get('/planes', poaCtrl.getPlanes);
router.post('/proyecto', poaCtrl.getProyectoPorId);
router.post('/proyectos', poaCtrl.getProyectos);
router.post('/proyectosHijos', poaCtrl.getProyectosHijos);
router.post('/actualizarActividad', poaCtrl.updateActividad);
router.post('/guardarEtapa', poaCtrl.guardarEtapa);

module.exports = router;
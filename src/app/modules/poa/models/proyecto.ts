import mongoose from 'mongoose';

export class Proyecto {
  _id: mongoose.Schema.Types.ObjectId;
  nombre: string;
  codIdentificacion: string;
  proyectoPadre: string;//Subproyecto de
  codPlanAnterior: string;//Plan anterior
  anioPlanAnterior: string;//Plan anterior
  proyectoInversion: boolean;
  cancelado: boolean;
  enPresentacion: boolean;
  dependencia: string;//id
  contratista: string;
  compromisoG: string;//id
  metaCuantificacion: string;
  metaProducto: string;
  descripcion: string;
  prioridadMinisterial: string;
  fechaInicio: string;//De partida presupuestaria
  monedaSolicitado: string;//Moneda presupuesto oficial
  presupuestoSolicitado: string//Presupuesto oficial
  prioridadJefatura: string;
  fechaFin: string;//De partida presupuestaria
  monedaGestion: string;//Moneda presupuesto adjudicado
  presupuestoGestion: string;//Presupuesto adjudicado
  proyectoPrioritario: boolean;//Mostrar en dashboard
  orden: string;
  grupo: string;
  comunas: string[];
  responsables: string[];
  jurisdiccionesParticipantes: string[];//Areas participantes
  coords: Object;
  anio: number;
  
  idPlan: mongoose.Schema.Types.ObjectId;
  idJurisdiccion: mongoose.Schema.Types.ObjectId;
  idObjImpacto: mongoose.Schema.Types.ObjectId;
  responsableDeCarga: string;//Va?
  fechaActualizacion: string;
  usuarioActualizacion: string;
  eliminado: boolean;

  constructor(proyecto){
    this.enPresentacion = proyecto.enPresentacion || false;
    this.anioPlanAnterior = proyecto.anioPlanAnterior || "";
    this.grupo = proyecto.grupo || "";
    this.eliminado = proyecto.eliminado || false;
  }
}
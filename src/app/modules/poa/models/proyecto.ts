import mongoose from 'mongoose';

export interface Proyecto {
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
  orden: number;
  grupo: string;
  comunas: string[];
  responsables: string[];
  jurisdiccionesParticipantes: string[];//Areas participantes

  idJurisdiccion: string;//Va?
  eliminado: boolean;
}
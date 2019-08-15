import mongoose from 'mongoose';

export interface Proyecto {
  _id: mongoose.Schema.Types.ObjectId;
  nombre: string;
  validado: boolean;
  aprobado: boolean;
  descripcion: string;
  codIdentificacion: string;//Codigo
  proyectoPadre: string;//Subproyecto de
  codPlanAnterior: string;//Plan anterior
  anioPlanAnterior: string;//Plan anterior
  dependencia: string;
  proyectoInversion: string;//De inversion
  cancelado: string;
  enPresentacion: string;
  etapaProyecto: string;//Etapa
  contratista: string;
  compromisoG: string;
  metaProducto: string;
  metaCuantificacion: string;
  //Falta el campo de expediente
  comunas: [];
  responsables: string[];
  //Partida presupuestaria
  prioridadMinisterial: string;
  fechaInicio: string;
  monedaSolicitado: string;//Presupuesto oficial
  presupuestoSolicitado: string;
  prioridadJefatura: string;
  fechaFin: string;
  monedaGestion: string;//Presupuesto adjudicado
  presupuestoGestion: string;
  etiquetas: string[];
  temas: [];
  proyectoPrioritario: boolean;
  coordenadas: {lat: string, lng: string};
  idJurisdiccion: string;
  eliminado: boolean;
}
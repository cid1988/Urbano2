import mongoose from 'mongoose';
import { FechaActividad } from './fechaActividad';

export class Actividad {
  _id: mongoose.Schema.Types.ObjectId;
  nombre: string;
  codIdentificacion: string;
  predecesor: string;
  etapa: string;
  cumplida: boolean;
  inicioCumplido: boolean;
  cancelada: boolean;
  fechas: [FechaActividad];
  verEnDashboard: boolean;
  idProyecto: string;
  idObjImpacto: string;
  idPlan: string;
  idJurisdiccion: string;

  constructor(actividad) {
    {
      this.nombre = actividad.nombre || "";
      this.codIdentificacion = actividad.codIdentificacion || "";
      this.predecesor = actividad.predecesor || "";
      this.etapa = actividad.etapa || "";
      this.cumplida = actividad.cumplida || false;
      this.inicioCumplido = actividad.inicioCumplido || false;
      this.cancelada = actividad.cancelada || false;
      this.fechas = actividad.fechas || [];
      this.verEnDashboard = actividad.verEnDashboard || false;
      this.idProyecto = actividad.idProyecto || "";
    }
  }
}
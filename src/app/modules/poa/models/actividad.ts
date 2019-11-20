import mongoose from 'mongoose';
import { FechaActividad } from './fechaActividad';

export class Actividad {
  _id: mongoose.Schema.Types.ObjectId;
  nombre: string;
  anio: number;
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
  coordenadas: object;
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
      this.anio = actividad.anio;
      this.coordenadas = actividad.coordenadas || {lat: Number, lng: Number};
      this.verEnDashboard = actividad.verEnDashboard || false;
      this.idProyecto = actividad.idProyecto || "";
      this.idPlan = actividad.idPlan || "";
      this.idJurisdiccion = actividad.idJurisdiccion || "";
      this.idObjImpacto = actividad.idObjImpacto || "";
    }
  }
}
import mongoose from 'mongoose';
import { FechaActividad } from './fechaActividad';

export interface Actividad {
  _id: mongoose.Schema.Types.ObjectId;
  nombre: string;
  codIdentificacion: string;
  predecesor: string;
  etapa: string;
  cumplida: boolean;
  inicioCumplido: boolean;
  cancelada: boolean;
  fechas: FechaActividad[];
  verEnDashboard: boolean;
  idProyecto: string;
}
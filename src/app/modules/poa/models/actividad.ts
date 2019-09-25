import mongoose from 'mongoose';

export interface Actividad {
  _id: mongoose.Schema.Types.ObjectId;
  nombre: string;
  codIdentificacion: string;
  predecesor: string;
  etapa: string;
  cumplida: boolean;
  inicioCumplido: boolean;
  cancelada: boolean;
  fechas: Object[];
  verEnDashboard: boolean;
}
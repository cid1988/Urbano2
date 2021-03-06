import mongoose from 'mongoose';

export class Etapa {
  _id: mongoose.Schema.Types.ObjectId;
  nombre: string;
  orden: string;
  idProyecto: string;

  constructor(etapa) {
    {
      this.nombre = etapa.nombre || "";
      this.orden = etapa.orden || "";
      this.idProyecto = etapa.idProyecto || "";
    }
  }
}
export class FechaActividad {
  fechaInicio: string;
  fechaFin: string;
  avance: string;
  comentario: string;
  fechaCreacion: string;

  constructor(fechaActividad) {
    {
      this.fechaInicio = fechaActividad.fechaInicio;
      this.fechaFin = fechaActividad.fechaFin;
      this.avance = fechaActividad.avance || "";
      this.comentario = fechaActividad.comentario || "";
      this.fechaCreacion = new Date().toString();
    }
  }
}
export class Compromiso {
  _id: String;
  tarea: String;
  responsable: [String];
  fecha: String;
  importante: Boolean;
  proximaReunion: Boolean;
  cumplido: Boolean;
  cancelado: Boolean;
  titulo: String;
  poa: String;
  idSerie: String;
  idReunion: String;
  estado:String;

  constructor(compromiso){
    this.tarea = compromiso.tarea || "";
    this.responsable = compromiso.responsable || [];
    this.idSerie = compromiso.idSerie || "";
    this.idReunion = compromiso.idReunion || "";
    this.fecha = compromiso.fecha || "";
    this.importante = compromiso.importante || false;
    this.proximaReunion = compromiso.proximaReunion || false;
    this.cumplido = compromiso.cumplido || false;
    this.cancelado = compromiso.cancelado || false;
    this.titulo = compromiso.titulo || '';
    this.poa = compromiso.poa || '';
    this.estado = compromiso.estado || '';
  }
}
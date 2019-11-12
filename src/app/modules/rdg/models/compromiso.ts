export class Compromiso {
  tarea: String;
  responsable: [String];
  fecha: String;
  importante: Boolean;
  titulo: String;
  poa: String;
  estado:String;

  constructor(compromiso){
    this.tarea = compromiso.tarea || "";
    this.responsable = compromiso.responsable || [];
    this.fecha = compromiso.fecha || "";
    this.importante = compromiso.importante || false;
    this.titulo = compromiso.titulo || '';
    this.poa = compromiso.poa || '';
    this.estado = compromiso.estado || '';
  }
}
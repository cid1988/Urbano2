export class Reunion {
  _id: String;
  start: String;
  end: String;
  color: String;
  desdeDate: number;
  hastaDate: number;
  desdeHora: string;
  hastaHora: string;
  title: String;
  usuarioCreacion: String;
  reunion: Object;
  lugar: String;
  tipo: String;
  titulo: String;
  fechaCreacion: String;

  constructor(reunion){
    {
      this.start = reunion.start || "";
      this.end = reunion.end || "";
      this.color = reunion.color || "";
      this.desdeDate = reunion.desdeDate;
      this.hastaDate = reunion.hastaDate;
      this.desdeHora = reunion.desdeHora;
      this.hastaHora = reunion.hastaHora;
      this.title = reunion.title;
      this.reunion = reunion.reunion || {};
      this.lugar = reunion.lugar || "";
      this.tipo = reunion.tipo || "";
      this.titulo = reunion.titulo || "";
      this.fechaCreacion = reunion.fechaCreacion || "";
    }
  }
}
export class Reunion {
  _id: String;
  start: String;
  end: String;
  color: String;
  desdeDate: Number;
  hastaDate: Number;
  desdeHora: String;
  hastaHora: String;
  title: String;
  usuarioCreacion: String;
  reunion: Object;
  lugar: String;
  tipo: String;
  titulo: String;

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
    }
  }
}
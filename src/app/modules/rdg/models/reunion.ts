export class Reunion {
  _id: String;
  start: String;
  end: String;
  color: String;
  desdeDate: Number;
  hastaDate: Number;
  title: String;
  usuarioCreacion: String;
  reunion: Object;
  tipo: String;
  titulo: String;

  constructor(reunion){
    {
      this.start = reunion.start || "";
      this.end = reunion.end || "";
      this.color = reunion.color || "";
      this.desdeDate = reunion.desdeDate;
      this.hastaDate = reunion.hastaDate;
      this.title = reunion.title;
      this.reunion = reunion.reunion || {};
      this.tipo = reunion.tipo || "";
      this.titulo = reunion.titulo || "";
    }
  }
}
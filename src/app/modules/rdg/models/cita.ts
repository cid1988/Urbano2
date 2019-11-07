export class Cita {
    para: String;
    cc: String;
    cco: String;
    exclusivos: String;
    usuario: Number;
    asunto: String;
    mensajeHtml: String;
    idInstancia: String;
    fecha: String;
    version:String;
  
    constructor(cita){
      {
        if(cita){
          this.para = cita.para || "";
          this.cc = cita.cc || "";
          this.cco = cita.cco || "";
          this.exclusivos = cita.exclusivos || '';
          this.usuario = cita.usuario || '';
          this.asunto = cita.asunto || '';
          this.mensajeHtml = cita.mensajeHtml || '';
          this.idInstancia = cita.idInstancia || '';
          this.fecha = cita.fecha || '';
          this.version = cita.version || '';
        }
      }
    }
  }
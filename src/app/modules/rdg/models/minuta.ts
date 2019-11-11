export class Minuta {
    instancia: String;
    compromisos: [Object];
    html: String;
    fecha: String;
    usuario: String;
    enviado: {
        para:[Object],
        cc:[Object],
        cco:[Object],
        exclisivos:[Object],
        fecha:String;
        usuario:String;
        asunto:String;
        mensajeHtml:String;
    }
  
    constructor(minuta){
        this.instancia = minuta.instancia || "";
        this.compromisos = minuta.compromisos || [];
        this.html = minuta.html || "";
        this.fecha = minuta.fecha || '';
        this.usuario = minuta.usuario || '';
        this.enviado = minuta.enviado || {};
    }
  }
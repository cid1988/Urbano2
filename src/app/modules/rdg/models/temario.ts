export class Temario {
    instancia: String;
    tipoTemario: String;
    html:String;
    fecha: String;
    usuario: String;
    comentarios: String;
    fechaComentarios: String;
    propuestaEnviado: {
        fecha:Date;
        version:String;
        para:[Object];
        cc:[Object];
        cco:[Object];
        exclusivos:[Object];
        asunto:String;
        mensajeHtml:String;
        usuario:String;
    };
    enviado: {
        fecha:Date;
        version:String;
        para:[Object];
        cc:[Object];
        cco:[Object];
        exclusivos:[Object];
        asunto:String;
        mensajeHtml:String;
        usuario:String;
    };

    constructor(data){
        this.instancia=data.instancia || '';
        this.tipoTemario= data.tipoTemario || '';
        this.html=data.html || '';
        this.fecha=data.fecha || '';
        this.usuario=data.usuario || '';
        this.comentarios=data.comentarios || '';
        this.fechaComentarios=data.comentarios || '';
        this.propuestaEnviado=data.propuestaEnviado || '';
        this.propuestaEnviado=data.propuestaEnviado || {};
    }
    
}
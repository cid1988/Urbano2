export class Mails {
    to: String;
    from: String;
    cc: String;
    bcc: String;
    subject: String;
    html: String;
  
    constructor(mail){
      this.to = mail.para || "";
      this.from = "Kevin Ruiz <kruiz@buenosaires.gob.ar>";
      this.cc = mail.cc || "";
      this.bcc = mail.cco + mail.exclusivos || '';
      this.subject = mail.asunto || '';
      this.html = mail.mensajeHtml || '';
    }
  }
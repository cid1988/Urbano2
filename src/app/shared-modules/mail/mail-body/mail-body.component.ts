import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MailService } from '../services/mail.service';
import { Mails } from '../model/mail';

@Component({
  selector: 'mail-body',
  templateUrl: './mail-body.component.html',
  styleUrls: ['./mail-body.component.css']
})
export class MailBodyComponent implements OnInit {
  @Input() asunto:String
  @Input() mensajeHtml:String='';
  @Output() infoMail = new EventEmitter<Mails>();
  
  config = environment.tinymceConfig;

  constructor(private mailService:MailService) { 
  }

  ngOnInit() {
    
  }
  enviarMail(infoMail){
    this.mailService.envioMail(infoMail).subscribe(data=>{

    })
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mail-body',
  templateUrl: './mail-body.component.html',
  styleUrls: ['./mail-body.component.css']
})
export class MailBodyComponent implements OnInit {
  @Input() asunto:String
  @Input() mensajeHtml:String='';

  
  config = environment.tinymceConfig;

  constructor() { 
  }

  ngOnInit() {
  }

}

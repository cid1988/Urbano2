import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mail-header',
  templateUrl: './mail-header.component.html',
  styleUrls: ['./mail-header.component.css']
})
export class MailHeaderComponent implements OnInit {
  @Input() tipoEnvio:String;
  @Input() editando:Boolean;
  @Input() envioIndividual:Boolean=true;
  individual:Boolean
  @Input() lista;

  constructor() {
    this.individual=false;
  }

  ngOnInit() {
    
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mail-header',
  templateUrl: './mail-header.component.html',
  styleUrls: ['./mail-header.component.css']
})
export class MailHeaderComponent implements OnInit {

  @Input() editando:Boolean;

  @Input() lista;

  constructor() {
    
  }

  ngOnInit() {
    
  }

  agregaritem(info){

  }
  quitarItem(i,tipo){
    if(tipo=='para') this.lista.para.splice(i,1)
    if(tipo=='cc') this.lista.cc.splice(i,1)
    if(tipo=='cco') this.lista.cco.splice(i,1)
    if(tipo=='exclusivos') this.lista.exclusivos.splice(i,1)
  }
}

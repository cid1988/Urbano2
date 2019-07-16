import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarioComponent } from '../../components/calendario/calendario.component';

@Component({
  selector: 'view-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioViewComponent implements OnInit {

  calendar
  @ViewChild(CalendarioComponent) hijo: CalendarioComponent;

  reuniones = [{start: "2019-06-19",end: "2019-06-19"}]
  constructor() {
    // this.hijo.llamarCalendario(this.reuniones);
  }

  ngOnInit() {
    
  }

}

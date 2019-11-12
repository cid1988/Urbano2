import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-compromisos',
  templateUrl: './compromisos.component.html',
  styleUrls: ['./compromisos.component.css']
})
export class CompromisosComponent implements OnInit {

  @Input() compromiso:any;
  @Input() idMinuta:any;
  @Input() pendiente:Boolean=false;
  constructor() { }

  ngOnInit() {
  }

}

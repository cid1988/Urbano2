import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarioService } from '../../services/calendario.service';
import { MailHeaderComponent } from '../../components/mail-header/mail-header.component';
import { Serie } from '../../models/serie';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.css']
})
export class MaestrosComponent implements OnInit {

  
  maestros;
  maestroSeleccionado;
  seleccionTab='participantes';
  datosMaestro=new Serie();

  constructor(private calendarioService: CalendarioService) {
    this.calendarioService.getMaestros().subscribe(maestros => {
      this.maestros = maestros;
    })
  }

  ngOnInit() {
  }

  consulta(datos){
    this.datosMaestro=datos
  }
}

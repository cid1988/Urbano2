import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarioService } from '../../services/calendario/calendario.service';
import { Serie } from '../../models/serie';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.css']
})
export class MaestrosComponent implements OnInit {

  editando=false;
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
  guardar(){
    this.calendarioService.guardarMaestro(this.datosMaestro).subscribe((data)=>{
      this.editando=false;
    })
  }
}

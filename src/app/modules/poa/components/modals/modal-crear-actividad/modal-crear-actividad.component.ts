import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActividadesService } from '../../../services/actividades/actividades.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProyectosService } from '../../../services/proyectos/proyectos.service';
import { FechaActividad } from '../../../models/fechaActividad';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-crear-actividad',
  templateUrl: './modal-crear-actividad.component.html',
  styleUrls: ['./modal-crear-actividad.component.css']
})
export class ModalCrearActividadComponent implements OnInit {

  actividad;
  hito = new FechaActividad({});
  etapas;
  objetivosImpacto = [];
  @Output() action = new EventEmitter();
  
  constructor(private actividadesService: ActividadesService, private proyectosService: ProyectosService, public bsModalRef: BsModalRef) {
    this.proyectosService.getObjetivosImpacto().subscribe(objsImpacto =>{
      this.objetivosImpacto = objsImpacto;
    });
  }
 
  ngOnInit() {
    this.proyectosService.etapasPorProyecto(this.actividad.idProyecto).subscribe((etapas: any[]) =>{
      this.etapas = etapas;
    },error => {
      console.log(error);
    });
  }

  guardarActividad(){
    this.hito.fechaInicio = moment(this.hito.fechaInicio).format("DD/MM/YYYY");
    this.hito.fechaFin = moment(this.hito.fechaFin).format("DD/MM/YYYY");
    this.actividad.fechas.push(this.hito)
    this.actividadesService.crearActividad(this.actividad).subscribe(data =>{
      this.action.emit(true);
      this.bsModalRef.hide();
    },error=>{
      console.log(error)
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActividadesService } from '../../../services/actividades/actividades.service';
import { Actividad } from '../../../models/actividad';
import { FechaActividad } from '../../../models/fechaActividad';
import { ProyectosService } from '../../../services/proyectos/proyectos.service';

declare var $:any;

@Component({
  selector: 'actividad-detalle',
  templateUrl: './actividad-detalle.component.html',
  styleUrls: ['./actividad-detalle.component.css']
})

export class ActividadDetalleComponent implements OnInit {

  actividad: Actividad;
  editando = false;
  etapas = [];
  fecha = {} as FechaActividad;
  predecesores: Actividad[];
  state;

  constructor(private activatedRoute:ActivatedRoute, private proyectosService: ProyectosService, private actividadesService:ActividadesService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.actividadesService.getActividad(params.get("idActividad")).subscribe((actividad: Actividad) =>{
        this.actividad = actividad;
      });
      this.proyectosService.etapasPorProyecto(params.get("idProyecto")).subscribe(etapas =>{
        this.etapas = etapas;
      });
      this.actividadesService.actividadesPorProyecto(params.get('idProyecto')).subscribe(actividades =>{
        this.predecesores = actividades;
      });
    });
  }

  ngOnInit() {
    
  }

  guardar(form){
    this.actividadesService.guardarActividad(this.actividad).subscribe((data:any) =>{
      this.editando = false;//Guarda pero no entra al subscribe
      alert(data.status);
    })
  }

  openModal(confirmado, fecha){
    if(confirmado){
      this.fecha = {} as FechaActividad;
      this.actividad.fechas.push(fecha);
      $('#modalCrearFecha').modal('hide');
    }else{
      $('#modalCrearFecha').modal('show');
    }
  }

  eliminarActividad(){
    alert("Eliminar actividad");
  }
}
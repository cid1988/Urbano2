import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadesService } from '../../../services/actividades/actividades.service';
import { Actividad } from '../../../models/actividad';

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
  fecha = {
    fechaInicio: "",
    fechaFin: "",
    comentario: ""
  };
  predecesores: Actividad[];

  constructor(private activatedRoute:ActivatedRoute, private actividadesService:ActividadesService, private router: Router) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.actividadesService.getActividad(params.get("idActividad")).subscribe((actividad: Actividad) =>{
        this.actividad = actividad;
      });
      this.actividadesService.etapasPorProyecto(params.get("idProyecto")).subscribe(etapas =>{
        this.etapas = etapas;
      });
      this.actividadesService.actividadesPorEtapa(params.get("idEtapa")).subscribe(actividadesDelProyecto =>{
        this.predecesores = actividadesDelProyecto;
      });
    });
  }

  ngOnInit() {
    
  }

  guardar(form){
    this.actividadesService.guardarActividad(this.actividad).subscribe((data:any) =>{
      this.editando = false;
      alert(data.status);
    })
  }

  openModal(confirmado, fecha){
    if(confirmado){
        this.fecha = {
          fechaInicio: "",
          fechaFin: "",
          comentario: ""
        };
        this.actividad.fechas.push(fecha);
        $('#modalCrearFecha').modal('hide');
    }else{
      $('#modalCrearFecha').modal('show');
    }
  }
}
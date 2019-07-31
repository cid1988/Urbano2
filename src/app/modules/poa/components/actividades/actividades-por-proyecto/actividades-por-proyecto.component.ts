import { Component, OnInit, Input } from '@angular/core';
import { ActividadesService } from '../../../services/actividades/actividades.service';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../../services/proyectos/proyectos.service';
import * as moment from 'moment';

declare var $:any;

@Component({
  selector: 'actividades-por-proyecto',
  templateUrl: './actividades-por-proyecto.component.html',
  styleUrls: ['./actividades-por-proyecto.component.css']
})
export class ActividadesPorProyectoComponent implements OnInit {
  
  actividades = [];
  etapas;
  @Input() proyecto = {_id: ""};
  hoy = moment(new Date(), "DD/MM/YYYY").format("YYYYMMDD");

  constructor(private actividadesService: ActividadesService, private proyectosService: ProyectosService, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.proyectosService.getProyectoPorId(params.get("idProyecto")).subscribe(proyecto =>{
        this.proyecto = proyecto;
      })
      this.getActividades(params.get("idProyecto"));
    });
  }

  ngOnInit() {
    // this.getActividades(this.proyecto);
  }
  
  getActividades(idProyecto){
    //Crear las etapas
    this.actividadesService.etapasPorProyecto(idProyecto).subscribe((etapas: any[]) =>{
      for (let e = 0; e < etapas.length; e++) {
        this.actividadesService.actividadesPorEtapa(etapas[e]._id).subscribe(actividades =>{

          for (let i = 0; i < actividades.length; i++) {
            let actividad = actividades[i];
            let colorDefinitivo = "";

            if(actividad.color == 'red'){
              colorDefinitivo = 'red';
            }else if(actividad.color == 'green'){
              colorDefinitivo = 'green';
            }

            if(i == actividades.length - 1){
              etapas[e].color = colorDefinitivo;
            }
          }
          etapas[e].actividades = actividades;
        })
      }
      this.etapas = etapas;
    })

    
    //Crear las actividades de cada etapa
    this.actividadesService.actividadesPorProyecto(idProyecto).subscribe(actividades =>{
      this.actividades = actividades;
    },error =>{
      alert(error);
    })
  }

  crearEtapa(){
    $('#modalCrearEtapa').modal('show');
  }
}
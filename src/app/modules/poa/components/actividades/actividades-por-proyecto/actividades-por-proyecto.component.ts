import { Component, OnInit, Input } from '@angular/core';
import { ActividadesService } from '../../../services/actividades/actividades.service';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../../services/proyectos/proyectos.service';

@Component({
  selector: 'actividades-por-proyecto',
  templateUrl: './actividades-por-proyecto.component.html',
  styleUrls: ['./actividades-por-proyecto.component.css']
})
export class ActividadesPorProyectoComponent implements OnInit {
  
  actividades = [];
  etapas;
  @Input() proyecto = {_id: ""};

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
    this.actividadesService.etapasPorProyecto(idProyecto).subscribe(etapas =>{
      for (let e = 0; e < etapas.length; e++) {
        this.actividadesService.actividadesPorEtapa(etapas[e]._id).subscribe(actividades =>{
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
}
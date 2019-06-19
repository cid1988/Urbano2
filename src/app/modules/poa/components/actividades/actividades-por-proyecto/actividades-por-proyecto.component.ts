import { Component, OnInit, Input } from '@angular/core';
import { ActividadesService } from '../../../services/actividades/actividades.service';
import { ActivatedRoute } from '@angular/router';
import { ProyectoCrearComponent } from '../../proyectos/proyecto-crear/proyecto-crear.component';

@Component({
  selector: 'actividades-por-proyecto',
  templateUrl: './actividades-por-proyecto.component.html',
  styleUrls: ['./actividades-por-proyecto.component.css']
})
export class ActividadesPorProyectoComponent implements OnInit {
  
  actividades;
  @Input() proyecto = {_id: ""};

  constructor(private actividadesService: ActividadesService, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.getActividades(params.get("id"));
    });
  }

  ngOnInit() {
    this.getActividades(this.proyecto);
  }

  getActividades(proyecto){
    this.actividadesService.actividadesPorProyecto(proyecto).subscribe(actividades =>{
      this.actividades = actividades;
    },error =>{
      alert(error);
    })
  }
}
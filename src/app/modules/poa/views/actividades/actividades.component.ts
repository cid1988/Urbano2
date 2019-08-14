import { Component, OnInit, ViewChild } from '@angular/core';
import { ActividadesPorProyectoComponent } from '../../components/actividades/actividades-por-proyecto/actividades-por-proyecto.component';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../services/proyectos/proyectos.service';
import { Proyecto } from '../../models/proyecto';

@Component({
  selector: 'actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  @ViewChild(ActividadesPorProyectoComponent, {static: true}) hijo: ActividadesPorProyectoComponent;
  proyecto = <Proyecto>{};

  constructor(private activatedRoute: ActivatedRoute, private proyectosService:ProyectosService) {
    this.activatedRoute.paramMap.subscribe(params => {
      // this.proyecto._id = params.get("idProyecto");
      this.proyectosService.getProyectoPorId(params.get("idProyecto")).subscribe(proyecto =>{
        this.proyecto = proyecto;
        // this.hijo.getActividades(this.proyecto);
      })
    });
  }

  ngOnInit() {
    this.hijo.getActividades(this.proyecto);
  }
}

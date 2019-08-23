import { Component, OnInit, ViewChild } from '@angular/core';
import { ProyectosPorPlanComponent } from '../../components/proyectos/proyectos-por-plan/proyectos-por-plan.component';
import { ProyectosService } from '../../services/proyectos/proyectos.service';
import { PlanesService } from '../../services/planes/planes.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  plan = {};//De entrada traer siempre el ultimo
  planes = [];
  area = {};//Traer las correspondientes segun permisos
  areas: any = [];
  searchFilter = "";

  @ViewChild(ProyectosPorPlanComponent, {static: false}) hijo: ProyectosPorPlanComponent;
  
  constructor(private proyectosService: ProyectosService, private planesService: PlanesService) {
    this.planesService.getPlanes().subscribe(planes =>{
      this.planes = planes;
      this.plan = planes.slice(-1)[0];
      this.seleccionPlan(this.plan);
    });
  }

  ngOnInit() {
  }
  
  seleccionPlan(plan){
    this.plan = plan;
    this.proyectosService.getAreasPorPlan(this.plan).subscribe(areas =>{
      this.areas = areas;
      this.area = areas.slice(-1)[0];
      this.hijo.getProyectos(this.plan,this.area);
    });
  }

  seleccionArea(area){
    this.area = area;
    this.hijo.getProyectos(this.plan,this.area)
  }

  filtroProyectos(searchFilter){
    this.searchFilter = searchFilter;
  }
}

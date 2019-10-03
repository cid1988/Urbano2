import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ProyectosService } from '../../../services/proyectos/proyectos.service';
import { Proyecto } from '../../../models/proyecto';
import { Plan } from '../../../models/plan';
import { Area } from '../../../models/area';

declare var $:any;

@Component({
  selector: 'proyectos-por-plan',
  templateUrl: './proyectos-por-plan.component.html',
  styleUrls: ['./proyectos-por-plan.component.css']
})
export class ProyectosPorPlanComponent implements OnInit {

  @Input() plan:Plan;
  proyectos: Proyecto[];
  @Input() area: Area;
  @Input() searchFilter = "";
  nuevoProyecto = <Proyecto>{};
  proyectosPadre = [];

  constructor(private proyectosService: ProyectosService) {}

  ngOnInit() {
    
  }

  getProyectos(plan,area){
    this.proyectosService.proyectosPorPlan(plan,area).subscribe((proyectos: any[]) =>{
      for (let p = 0; p < proyectos.length; p++) {
        let proyecto = proyectos[p];
        // Armar los proyectos hijos del proyecto
        if(!proyecto.proyectoPadre){
          this.proyectosService.getProyectosHijos(proyecto._id,proyecto.idPlan).subscribe((hijos) =>{
            proyecto.hijos = hijos;
          });
          this.proyectosPadre.push(proyecto);
        }
      }
      this.proyectos = proyectos;
    },error =>{
      alert(error);
    })
  }

  crearProyecto(confirmado, nuevoProyecto){
    if(confirmado){
      nuevoProyecto.idPlan = this.plan._id;
      nuevoProyecto.anio = this.plan.anio;
      nuevoProyecto.idJurisdiccion = this.area._id;
      
      this.proyectosService.crearProyecto(nuevoProyecto).subscribe(data =>{
        this.getProyectos(this.plan,this.area);
        this.nuevoProyecto = {} as Proyecto;
        $('#modalCrearProyecto').modal('hide');
      })
    }else{
      $('#modalCrearProyecto').modal('show');
    }
  }
}

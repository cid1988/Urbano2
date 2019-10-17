import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ProyectosService } from '../../../services/proyectos/proyectos.service';
import { Proyecto } from '../../../models/proyecto';
import { Plan } from '../../../models/plan';
import { Area } from '../../../models/area';
import { ModalCrearProyectoComponent } from '../../modals/modal-crear-proyecto/modal-crear-proyecto.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  bsModalRef: BsModalRef;

  constructor(private proyectosService: ProyectosService, private modalService: BsModalService) {}

  ngOnInit() {
    
  }

  getProyectos(plan,area){
    this.proyectos = [];this.proyectosPadre = [];
    this.proyectosService.proyectosPorPlan(plan._id,area._id).subscribe((proyectos: any[]) =>{
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

  // crearProyecto(confirmado, nuevoProyecto){
  //   if(confirmado){
  //     nuevoProyecto.idPlan = this.plan._id;
  //     nuevoProyecto.anio = this.plan.anio;
  //     nuevoProyecto.idJurisdiccion = this.area._id;

  //     this.proyectosService.crearProyecto(nuevoProyecto).subscribe(data =>{
  //       this.getProyectos(this.plan,this.area);
  //       this.nuevoProyecto = {} as Proyecto;
  //       $('#modalCrearProyecto').modal('hide');
  //     })
  //   }else{
  //     $('#modalCrearProyecto').modal('show');
  //   }
  // }

  crearProyecto() {
    const initialState = {proyecto: new Proyecto({
      idPlan: this.plan._id,
      anio: this.plan.anio,
      idJurisdiccion: this.area._id
    }),proyectosPadre: this.proyectosPadre};
    this.bsModalRef = this.modalService.show(ModalCrearProyectoComponent, {initialState});
    this.bsModalRef.content.action.subscribe((status) => {
      if(status) this.getProyectos(this.plan,this.area);
    });
  }
}

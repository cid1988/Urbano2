import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ProyectosService } from '../../../services/proyectos/proyectos.service';
import { Proyecto } from '../../../models/proyecto';
import { ActividadesService } from '../../../services/actividades/actividades.service';

@Component({
  selector: 'proyectos-por-plan',
  templateUrl: './proyectos-por-plan.component.html',
  styleUrls: ['./proyectos-por-plan.component.css']
})
export class ProyectosPorPlanComponent implements OnInit {

  @Input() plan = {};
  proyectos: Proyecto[];
  @Input() area = {};

  constructor(private proyectosService: ProyectosService, private actividadesService: ActividadesService) {
    // this.getProyectos(this.plan,this.area);
  }

  ngOnInit() {
    
  }

  chequearActividades(proyecto){//Ejecutar todo desde el backend e implementar moment
    this.actividadesService.actividadesPorProyecto(proyecto).subscribe((actividades: any[]) =>{
      let total = actividades.length -1;
      let estado = "";

      for (let a = 0; a < actividades.length; a++) {
        const actividad = actividades[a];
        
        if(actividad.cancelada){
          estado = "cancelado";
        }else if(actividad.cumplida){
          estado = "cumplido";
        }else{
          if(actividad.fechas.slice(-1)[0].fechaInicio < "10/06/2019"){
            estado = "vencido"
          }else{
            estado = "vigente"
          }
        }
        if(total == a){
          proyecto.estado = estado;
        }
      }
      return;
    })
  }

  getProyectos(plan,area){
    this.proyectosService.proyectosPorPlan(plan,area).subscribe((proyectos: any[]) =>{
      for (let p = 0; p < proyectos.length; p++) {
        let proyecto = proyectos[p];

        //Armar las etapas
        // this.proyectosService.etapasPorProyecto(proyecto).subscribe(etapas =>{
        //   console.log(etapas)
        // })

        //Armar los proyectos hijos del proyecto
        if(!proyecto.proyectoPadre){
          proyecto.hijos = [];
          this.proyectosService.getProyectosHijos(proyecto._id,proyecto.anio).subscribe((hijos) =>{
            proyecto.hijos = hijos;
          });
        }
      }

      this.proyectos = proyectos;
      // for (let i = 0; i < proyectos.length; i++) {
      //   const proyectoPadre = proyectos[i];
        
      //   if(proyectoPadre.idJurisdiccion == area._id && proyectoPadre.eliminado !== true){
      //     for (let h = 0; h < proyectos.length; h++) {
      //       const proyectoHijo = proyectos[h];
            
      //       if(!proyectoPadre.hijos){
      //         proyectoPadre.hijos = [];
      //       }
  
      //       //Pusheo los proyectos hijos en el array del proyecto padre
      //       if(proyectoPadre._id == proyectoHijo.proyectoPadre){
      //         this.chequearActividades(proyectoHijo);
      //         proyectoPadre.hijos.push(proyectoHijo);
      //       }
      //     }
      //   }
      // }
    },error =>{
      alert(error);
    })
  }
}

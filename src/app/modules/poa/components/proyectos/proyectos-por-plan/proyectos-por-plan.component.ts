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
    
  }

  ngOnInit() {
    
  }

  // chequearActividades(proyecto){//Ejecutar todo desde el backend e implementar moment
  //   this.actividadesService.actividadesPorProyecto(proyecto).subscribe((actividades: any[]) =>{
  //     let total = actividades.length -1;
  //     let estado = "";

  //     for (let a = 0; a < actividades.length; a++) {
  //       const actividad = actividades[a];
        
  //       if(actividad.cancelada){
  //         estado = "cancelado";
  //       }else if(actividad.cumplida){
  //         estado = "cumplido";
  //       }else{
  //         if(actividad.fechas.slice(-1)[0].fechaInicio < "10/06/2019"){
  //           estado = "vencido"
  //         }else{
  //           estado = "vigente"
  //         }
  //       }
  //       if(total == a){
  //         proyecto.estado = estado;
  //       }
  //     }
  //     return;
  //   })
  // }

  setColorSubproyecto(proyectosHijo){
    for (let i = 0; i < proyectosHijo.length; i++) {
      const p = proyectosHijo[i];
      
      if(p.color == "blue"){
        return "blue";
      }
    }
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
          this.proyectosService.getProyectosHijos(proyecto._id,proyecto.anio).subscribe((hijos) =>{
            // proyecto.statusColor = this.setColorSubproyecto(hijos);
            proyecto.hijos = hijos;
            console.log(hijos)
          });
        }
      }
      this.proyectos = proyectos;
    },error =>{
      alert(error);
    })
  }
}

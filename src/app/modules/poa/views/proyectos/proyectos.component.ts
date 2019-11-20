import { Component, OnInit, ViewChild } from '@angular/core';
import { ProyectosPorPlanComponent } from '../../components/proyectos/proyectos-por-plan/proyectos-por-plan.component';
import { ProyectosService } from '../../services/proyectos/proyectos.service';
import { PlanesService } from '../../services/planes/planes.service';
import { Plan } from '../../models/plan';
import { UserService } from 'src/app/modules/administrador/services/user/user.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  plan: Plan;//De entrada traer siempre el ultimo
  planes = [];
  area = {};
  areas: any = [];
  usuarioLogueado = "";
  @ViewChild(ProyectosPorPlanComponent, {static: true}) proyectosPorPlan: ProyectosPorPlanComponent;
  
  constructor(private proyectosService: ProyectosService, private planesService: PlanesService, private userService: UserService, private permissionsService: NgxPermissionsService) {
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
    let userAreaPoa = this.userService.getJurisdiccionPOA();

    this.proyectosService.getAreasPorPlan(this.plan._id).subscribe((areas: any) =>{//Traer todas las areas del plan
      for (let i = 0; i < areas.length; i++) {
        const area = areas[i];
        
        if(area.idOrganigrama == userAreaPoa){
          this.area = area;
          
          if(this.permissionsService.getPermission("poa.verJurisdiccion")){//Si el user pertenece a un area ve solo esa area
            this.areas = [area];
          }else if(this.permissionsService.getPermission("poa.administrador")){//Si el user es admin ve todas las areas
            this.areas = areas;
          }
          this.proyectosPorPlan.getProyectos(this.plan,this.area);
        }
      }
    });
  }

  seleccionArea(area){
    this.area = area;
    this.proyectosPorPlan.getProyectos(this.plan,this.area);
  }
}

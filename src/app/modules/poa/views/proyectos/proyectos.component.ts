import { Component, OnInit, ViewChild } from '@angular/core';
import { ProyectosPorPlanComponent } from '../../components/proyectos/proyectos-por-plan/proyectos-por-plan.component';
import { ProyectosService } from '../../services/proyectos/proyectos.service';
import { PlanesService } from '../../services/planes/planes.service';
import { Plan } from '../../models/plan';
import { UserService } from 'src/app/modules/administrador/services/user/user.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { AutenticacionService } from 'src/app/shared-modules/login/services/autenticacion/autenticacion.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  plan: Plan;//De entrada traer siempre el ultimo
  planes = [];
  area = {};//Traer las correspondientes segun permisos
  areas: any = [];
  usuarioLogueado = "";
  @ViewChild(ProyectosPorPlanComponent, {static: true}) proyectosPorPlan: ProyectosPorPlanComponent;
  
  constructor(private proyectosService: ProyectosService, private planesService: PlanesService, private userService: UserService, private authentication: AutenticacionService) {
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
    this.proyectosService.getAreasPorPlan(this.plan._id).subscribe((areas: any) =>{
      this.areas = areas;
      this.usuarioLogueado = this.authentication.getUsuarioLogeado();
      this.userService.getUsers().subscribe((users: any) =>{//Busco y asigno el area del usuario logueado
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          
          if(user.username == this.usuarioLogueado){
            for (let a = 0; a < areas.length; a++) {
              const area = areas[a];
              
              if(area.idOrganigrama == user.jurisdiccion){
                this.area = area;
                this.proyectosPorPlan.getProyectos(this.plan,this.area);
              }
            }
          }
        }
      })
    });
  }

  seleccionArea(area){
    this.area = area;
    this.proyectosPorPlan.getProyectos(this.plan,this.area);
  }
}

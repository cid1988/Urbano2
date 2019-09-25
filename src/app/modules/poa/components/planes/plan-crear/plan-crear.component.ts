import { Component, OnInit } from '@angular/core';
import { Plan } from '../../../models/plan';
import { ProyectosService } from '../../../services/proyectos/proyectos.service';
import { OrganigramaService } from 'src/app/modules/organigrama/services/organigrama.service';

@Component({
  selector: 'plan-crear',
  templateUrl: './plan-crear.component.html',
  styleUrls: ['./plan-crear.component.css']
})
export class PlanCrearComponent implements OnInit {

  anioActual = new Date().getFullYear() + 1;
  
  organigrama;//Todas las areas
  areasPlan;//Areas asociadas al plan
  areaSeleccionada;
  areasResponsables: any[] = [];
  nuevoPlan: Plan = {
    _id: "",
    anio: this.anioActual,
    etapa: "Planificacion",
    apagado: false,
    editable: false,
    creadoPor: "userLogueado",//Hacerlo desde el backend
    modificadoPor: "userLogueado",//Hacerlo desde el backend
    array: []
  };

  constructor(private organigramaService: OrganigramaService ,private proyectosService: ProyectosService) {
    this.getAreas();
  }

  ngOnInit() {
  }

  agregarArea(area){
    let nuevaArea = {
      _id: "",
      nombre: area.nombreCompleto,
      idOrganigrama: area._id,
      idPlan: "",//Se agrega despues de guardar el plan
    }
    this.areasResponsables.push(nuevaArea);
  }

  eliminarArea(){

  }

  getAreas(){
    this.organigramaService.getOrganigrama().subscribe(organigrama =>{
      this.organigrama = organigrama;
    });
  }

  guardarPlan(){
    this.nuevoPlan.array = this.areasResponsables;
    this.proyectosService.crearPlan(this.nuevoPlan).subscribe(data =>{
      console.log(data)
      // if(!this.areasResponsables.length) return;
      // let objeto = {
      //   idPlan: data.idPlan,
      //   array: this.areasResponsables
      // }
      // this.proyectosService.crearAreas(objeto).subscribe(data =>{
      //   console.log(data);
      // })
    })
  }
}

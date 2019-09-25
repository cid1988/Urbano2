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

  @ViewChild(ActividadesPorProyectoComponent, {static: true}) actividadesPorProyecto: ActividadesPorProyectoComponent;
  proyecto = <Proyecto>{};
  proyectos = [];
  editando = false;
  proyectoForm = {};

  //Pasar a una coleccion
  grupos = [{
    _id: "",
    nombre: "OBRAS HIDRÁULICAS",
  },{
    _id: "",
    nombre: "OBRAS DE INFRAESTRUCTURA URBANA",
  },{
    _id: "",
    nombre: "OBRAS DE REGENERACION URBANA",
  },{
    _id: "",
    nombre: "GRANDES OBRAS",
  },{
    _id: "",
    nombre: "OBRAS DE SUBTE",
  },{
    _id: "",
    nombre: "OBRAS DE CULTURA",
  },{
    _id: "",
    nombre: "OBRAS DE EDUCACIÓN",
  }];

  dependencias = [{
    nombre: "Dependencia 1"
  }];

  compromisos = [{
    nombre: "Compromiso 1"
  }];

  prioridadesMinisteriales = [{
    _id: "",
    nombre: "A+"
  },{
    _id: "",
    nombre: "A"
  },{
    _id: "",
    nombre: "B"
  },{
    _id: "",
    nombre: "C"
  },{
    _id: "",
    nombre: "No prioritario"
  },{
    _id: "",
    nombre: "Sin priorizar"
  }];

  constructor(private activatedRoute: ActivatedRoute, private proyectosService:ProyectosService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.proyectosService.getProyectoPorId(params.get("idProyecto")).subscribe(proyecto =>{
        this.proyecto = proyecto;
        let data = {_id: proyecto.idJurisdiccion};//Aclarar esta linea
        this.proyectosService.proyectosPorPlan(proyecto, data).subscribe((proyectos: any[]) =>{//No esta trayendo nada
          this.proyectos = proyectos;
        })
      });
    });
  }

  ngOnInit() {
    this.actividadesPorProyecto.getActividades(this.proyecto);
  }

  guardarProyecto(){
    this.proyectosService.actualizarProyecto(this.proyecto).subscribe(data =>{
      this.editando = false;
    })
  }
}

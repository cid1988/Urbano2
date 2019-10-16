import { Component, OnInit, ViewChild } from '@angular/core';
import { ActividadesPorProyectoComponent } from '../../components/actividades/actividades-por-proyecto/actividades-por-proyecto.component';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../services/proyectos/proyectos.service';
import { Proyecto } from '../../models/proyecto';
import { ComunasService } from 'src/app/shared-modules/login/services/comunas/comunas.service';

@Component({
  selector: 'actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  @ViewChild(ActividadesPorProyectoComponent, {static: true}) actividadesPorProyecto: ActividadesPorProyectoComponent;
  proyecto = new Proyecto({});
  proyectos: Proyecto[];
  editando = false;
  // proyectoForm = {};
  proyectosPadre = [];
  area;
  etapa;
  comunaSeleccionada = {};
  responsableSeleccionado = {};
  compromisosGobierno;
  objetivosImpacto;

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

  comunasLista;

  areas = [{
    _id: "111",
    nombre: "Area 1"
  }];

  constructor(private activatedRoute: ActivatedRoute, private proyectosService:ProyectosService, private comunasService: ComunasService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.proyectosService.getProyectoPorId(params.get("idProyecto")).subscribe((proyecto: Proyecto) =>{
        this.proyecto = proyecto;
        this.proyectosService.proyectosPorPlan(proyecto.idPlan,proyecto.idJurisdiccion).subscribe((proyectos: any[]) =>{
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
      });
      this.proyectosService.getObjetivosImpacto().subscribe(objsImpacto =>{
        this.objetivosImpacto = objsImpacto;
      });
      this.proyectosService.getCompromisosGobierno().subscribe(compromisosGobierno =>{
        this.compromisosGobierno = compromisosGobierno;
      });
    });

    this.comunasService.getComunas().subscribe(comunas =>{
      this.comunasLista = comunas;
    })
  }

  ngOnInit() {
    
  }

  guardarProyecto(){
    this.proyectosService.actualizarProyecto(this.proyecto).subscribe(data =>{
      this.editando = false;
    })
  }

  agregarComuna(comuna){
    if(this.proyecto.comunas == null) this.proyecto.comunas = [];//Llega el campo como null ver en el modelo por que no llega como array vacio
    this.proyecto.comunas.push(comuna._id);
    //Deberian excluirse del listado de comunas las que ya estan agregadas
  }

  agregarResponsable(responsable){
    this.proyecto.responsables.push(responsable._id);
  }

  agregarArea(area){
    this.proyecto.jurisdiccionesParticipantes.push(area._id);
  }
}

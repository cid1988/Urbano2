import { Component, OnInit, Input } from '@angular/core';
import { ActividadesService } from '../../../services/actividades/actividades.service';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../../services/proyectos/proyectos.service';
import * as moment from 'moment';

declare var $:any;

@Component({
  selector: 'actividades-por-proyecto',
  templateUrl: './actividades-por-proyecto.component.html',
  styleUrls: ['./actividades-por-proyecto.component.css']
})
export class ActividadesPorProyectoComponent implements OnInit {

  actividades : any[];
  etapas;
  nuevaEtapa = {actividades: [], idProyecto: ""};
  actividadesSelect = [];
  @Input() proyecto = {_id: ""};
  hoy = moment(new Date(), "DD/MM/YYYY").format("YYYYMMDD");

  @Input() prueba = {};

  constructor(private actividadesService: ActividadesService, private proyectosService: ProyectosService, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.proyectosService.getProyectoPorId(params.get("idProyecto")).subscribe(proyecto =>{
        this.proyecto = proyecto;
        this.prueba = proyecto.idJurisdiccion
      })
      this.getActividades(params.get("idProyecto"));
    });
  }

  ngOnInit() {

  }
  
  getActividades(idProyecto){
    //Crear las etapas
    if(!idProyecto.length) return;//No deberia usarse esto para controlar el error del objeto que llega desde el server.
    this.actividadesService.etapasPorProyecto(idProyecto).subscribe((etapas: any[]) =>{
      this.etapas = etapas;
    },error => {
      console.log(error);
    })

    //Traer las actividades del proyecto que no pertenecen a una etapa
    this.actividadesService.actividadesPorProyecto(idProyecto).subscribe(actividades =>{
      this.actividades = actividades;
      this.actividadesSelect = this.actividadesSelect.concat(actividades);
    },error =>{
      alert(error);
    })
  }

  //Al crear la etapa, en la etapa se va a guardar el campo idProyecto y en las actividades agregadas se va a asociar el id en el campo
  //etapa.
  crearEtapa(etapa){
    if(etapa){
      this.actividadesService.guardarEtapa(etapa).subscribe(data =>{
        this.getActividades(this.proyecto._id);
        $('#modalCrearEtapa').modal('hide');
      });
    }else{
      this.nuevaEtapa = {actividades:[],idProyecto: this.proyecto._id};
      $('#modalCrearEtapa').modal('show');
    }
  }
  
  editarEtapa(etapa,guardar){
    if(guardar){
      alert("Guardando cambios");
      this.nuevaEtapa = {actividades: [],idProyecto: this.proyecto._id};
      $('#modalCrearEtapa').modal('hide');
    }else{
      this.nuevaEtapa = etapa;
      $('#modalCrearEtapa').modal('show');
    }
  }

  agregarActividad(a){
    console.log("Actividad: ",a)
  }
}
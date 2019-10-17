import { Component, OnInit, Input } from '@angular/core';
import { ActividadesService } from '../../../services/actividades/actividades.service';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../../services/proyectos/proyectos.service';
import { Actividad } from '../../../models/actividad';
import { FechaActividad } from '../../../models/fechaActividad';
import { Proyecto } from '../../../models/proyecto';
import { ModalCrearEtapaComponent } from '../../modals/modal-crear-etapa/modal-crear-etapa.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Etapa } from '../../../models/etapa';
import { ModalCrearActividadComponent } from '../../modals/modal-crear-actividad/modal-crear-actividad.component';
declare var $:any;

@Component({
  selector: 'actividades-por-proyecto',
  templateUrl: './actividades-por-proyecto.component.html',
  styleUrls: ['./actividades-por-proyecto.component.css']
})
export class ActividadesPorProyectoComponent implements OnInit {

  actividades: any[];
  etapas: Etapa[];
  actividadesSelect = [];
  @Input() proyecto = new Proyecto({});
  editEtapa = {actividades: [], idProyecto: ""};
  nuevoHito = new FechaActividad({});
  bsModalRef: BsModalRef;

  constructor(private actividadesService: ActividadesService, private proyectosService: ProyectosService, private activatedRoute:ActivatedRoute, private modalService: BsModalService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.proyectosService.getProyectoPorId(params.get("idProyecto")).subscribe(proyecto =>{
        this.proyecto = proyecto;
      });
      this.getActividades(params.get("idProyecto"));
    });
  }

  ngOnInit() {

  }
  
  getActividades(idProyecto){
    //Crear las etapas
    if(!idProyecto.length) return;//No deberia usarse esto para controlar el error del objeto que llega desde el server.
    this.proyectosService.etapasPorProyecto(idProyecto).subscribe((etapas: any[]) =>{
      this.etapas = etapas;
    },error => {
      console.log(error);
    });

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
  // crearEtapa(etapa){
  //   if(etapa){
  //     this.actividadesService.crearEtapa(etapa).subscribe(data =>{
  //       this.getActividades(this.proyecto._id);
  //       $('#modalCrearEtapa').modal('hide');
  //     });
  //   }else{
  //     this.nuevaEtapa = {actividades:[],idProyecto: this.proyecto._id};
  //     $('#modalCrearEtapa').modal('show');
  //   }
  // }
  
  //Al crear la etapa, en la etapa se va a guardar el campo idProyecto y en las actividades agregadas se va a asociar el id en el campo etapa.
  crearEtapa(){
    const initialState = {etapa: new Etapa({idProyecto: this.proyecto._id})};
    this.bsModalRef = this.modalService.show(ModalCrearEtapaComponent, {initialState});
    this.bsModalRef.content.action.subscribe((status) => {
      if(status) this.getActividades(this.proyecto._id);
    });
  }

  editarEtapa(etapa,guardar){
    if(guardar){
      alert("Guardando cambios");
      this.actividadesService.editarEtapa(this.editEtapa).subscribe(data =>{
        this.getActividades(this.proyecto._id);
        this.editEtapa = {actividades: [],idProyecto: this.proyecto._id};
        $('#modalEditarEtapa').modal('hide');
      });
      $('#modalEditarEtapa').modal('hide');
    }else{
      this.editEtapa = etapa;
      $('#modalEditarEtapa').modal('show');
    }
  }

  crearActividad(){
    const initialState = {actividad: new Actividad({
      idPlan: this.proyecto.idPlan,
      idJurisdiccion: this.proyecto.idJurisdiccion,
      idProyecto: this.proyecto._id,
      anio: this.proyecto.anio
    })};
    this.bsModalRef = this.modalService.show(ModalCrearActividadComponent, {initialState});
    this.bsModalRef.content.action.subscribe((status) => {
      if(status) this.getActividades(this.proyecto._id);
    });
  }

  // crearActividad(actividad, guardar, userForm: NgForm){
  //   if(guardar){
  //     userForm.value.idPlan = this.proyecto.idPlan;
  //     userForm.value.idJurisdiccion = this.proyecto.idJurisdiccion;
  //     userForm.value.idProyecto = this.proyecto._id;
  //     this.nuevoHito.fechaInicio = moment(this.nuevoHito.fechaInicio).format("DD/MM/YYYY");
  //     this.nuevoHito.fechaFin = moment(this.nuevoHito.fechaFin).format("DD/MM/YYYY");
  //     if(!userForm.value.fechas) userForm.value.fechas = [];
  //     userForm.value.fechas.push(this.nuevoHito);
  //     console.log(userForm.value)
  //     this.actividadesService.crearActividad(userForm.value).subscribe(data =>{
  //       this.getActividades(this.proyecto._id);
  //       $('#modalCrearHito').modal('hide');
  //       userForm.resetForm({})
  //     },error =>{
  //       alert("Error")
  //     });
  //   }else{
  //     if(!actividad.fechas) actividad.fechas = [];
  //     this.nuevaActividad = actividad;
  //     $('#modalCrearHito').modal('show');
  //   }
  // }
}
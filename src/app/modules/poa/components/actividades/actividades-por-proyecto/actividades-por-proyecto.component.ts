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
import { ModalEditarEtapaComponent } from '../../modals/modal-editar-etapa/modal-editar-etapa.component';
declare var $:any;

@Component({
  selector: 'actividades-por-proyecto',
  templateUrl: './actividades-por-proyecto.component.html',
  styleUrls: ['./actividades-por-proyecto.component.css']
})
export class ActividadesPorProyectoComponent implements OnInit {

  actividades: any[];
  etapas: Etapa[];
  // actividadesSelect = [];
  @Input() proyecto = new Proyecto({});
  nuevoHito = new FechaActividad({});
  bsModalRef: BsModalRef;
  cargando = true;
  
  constructor(private actividadesService: ActividadesService, private proyectosService: ProyectosService, private activatedRoute:ActivatedRoute, private modalService: BsModalService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.proyectosService.getProyectoPorId(params.get("idProyecto")).subscribe((proyecto:Proyecto) =>{
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
    this.proyectosService.etapasPorProyecto(idProyecto).subscribe((etapas: Etapa[]) =>{
      this.etapas = etapas;
    },error => {
      console.log(error);
    });

    //Traer las actividades del proyecto que no pertenecen a una etapa
    this.actividadesService.actividadesPorProyecto(idProyecto).subscribe(actividades =>{
      this.actividades = actividades;
      this.cargando = false;
      // this.actividadesSelect = this.actividadesSelect.concat(actividades);//Se usaba para seleccionar las actividades cuando no eran un array definido
    },error =>{
      alert(error);
    });
  }
  
  //Al crear la etapa, en la etapa se va a guardar el campo idProyecto y en las actividades agregadas se va a asociar el id en el campo etapa.
  crearEtapa(){
    const initialState = {etapa: new Etapa({idProyecto: this.proyecto._id}),etapasDelProyecto: this.etapas};
    this.bsModalRef = this.modalService.show(ModalCrearEtapaComponent, {initialState});
    this.bsModalRef.content.action.subscribe((status) => {
      if(status) this.getActividades(this.proyecto._id);
    });
  }

  editarEtapa(etapa){
    const initialState = {etapa: etapa,etapasDelProyecto: this.etapas};
    this.bsModalRef = this.modalService.show(ModalEditarEtapaComponent, {initialState});
    this.bsModalRef.content.action.subscribe((status) => {
      if(status) this.getActividades(this.proyecto._id);
    });
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

  data(data){
    if(data.color == "blue"){
      return "Actividad cumplida";
    }
    if(data.color == "black"){
      return "Actividad cancelada";
    }
    if(data.color == "green"){
      return "Actividad aun vigente";
    }
    if(data.color == "red"){
      return "Actividad cumplida";
    }
  }
}
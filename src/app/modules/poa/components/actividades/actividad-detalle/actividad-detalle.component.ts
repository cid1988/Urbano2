import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActividadesService } from '../../../services/actividades/actividades.service';
import { Actividad } from '../../../models/actividad';
import { FechaActividad } from '../../../models/fechaActividad';
import { ProyectosService } from '../../../services/proyectos/proyectos.service';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalNuevaFechaComponent } from '../../modals/modal-nueva-fecha/modal-nueva-fecha.component';
import { Location } from '@angular/common';
declare var $:any;

@Component({
  selector: 'actividad-detalle',
  templateUrl: './actividad-detalle.component.html',
  styleUrls: ['./actividad-detalle.component.css']
})

export class ActividadDetalleComponent implements OnInit {  
  actividad = new Actividad({});
  editando = false;
  etapas = [];
  fecha = new FechaActividad({});
  predecesores: Actividad[];
  objetivosImpacto = [];
  areas;
  bsModalRef: BsModalRef;
  nombreProyecto;
  nombreJurisdiccion;
  actividadGuardada = new EventEmitter();

  constructor(private activatedRoute:ActivatedRoute, private proyectosService: ProyectosService, private actividadesService:ActividadesService, private modalService: BsModalService, private location: Location) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.actividadesService.getActividad(params.get("idActividad")).subscribe((actividad:Actividad) =>{
        this.actividad = actividad;
      });
      this.proyectosService.etapasPorProyecto(params.get("idProyecto")).subscribe(etapas =>{
        this.etapas = etapas;
      });
      this.actividadesService.actividadesPorProyecto(params.get('idProyecto')).subscribe(actividades =>{
        this.predecesores = actividades;
      });
      this.proyectosService.getObjetivosImpacto().subscribe(objsImpacto =>{
        this.objetivosImpacto = objsImpacto;
      });
      this.proyectosService.getAreas().subscribe(areas =>{
        this.areas = areas;
        this.nombreJurisdiccion = this.areaPorId(this.actividad.idJurisdiccion);
      });
      this.proyectosService.getProyectoPorId(params.get("idProyecto")).subscribe(proyecto =>{
        this.nombreProyecto = proyecto.nombre;
      });
    });
  }

  ngOnInit() {
    
  }

  guardar(){
    this.actividadesService.guardarActividad(this.actividad).subscribe((data:any) =>{
      this.actividadGuardada.emit(true);
      this.editando = false;
    }, error=>{
      console.log(error);
    })
  }

  openModal(confirmado, fecha: NgForm){
    if(confirmado){
      fecha.value.fechaInicio = moment(fecha.value.fechaInicio).format("DD/MM/YYYY");
      fecha.value.fechaFin = moment(fecha.value.fechaFin).format("DD/MM/YYYY");
      this.actividad.fechas.push(fecha.value);
      $('#modalCrearFecha').modal('hide');
      fecha.resetForm(new FechaActividad({}));
    }else{
      $('#modalCrearFecha').modal('show');
    }
  }

  eliminarActividad(){
    if(confirm("Esta seguro de eliminar la actividad?")){
      this.actividad.eliminado = true;
      this.guardar();
      this.actividadGuardada.subscribe(data=>{
        this.location.back();
      })
    }
  }

  crearHitoFecha() {
    const initialState = {fecha: new FechaActividad({})};
    this.bsModalRef = this.modalService.show(ModalNuevaFechaComponent, {initialState});
    this.bsModalRef.content.action.subscribe((fecha) => {
      this.actividad.fechas.push(fecha.value);
    });
  }

  areaPorId(idArea){
    if(!this.areas) return;
    for (let i = 0; i < this.areas.length; i++) {
      const area = this.areas[i];
      if(area._id == idArea){
        return area.nombre;
      }
    }
  }
}
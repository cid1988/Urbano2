import { Component, OnInit, ViewChild } from '@angular/core';
import { ActividadesPorProyectoComponent } from '../../components/actividades/actividades-por-proyecto/actividades-por-proyecto.component';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../services/proyectos/proyectos.service';
import { Proyecto } from '../../models/proyecto';
import { ComunasService } from 'src/app/shared-modules/comunas/services/comunas/comunas.service';
import { OrganigramaService } from 'src/app/modules/organigrama/services/organigrama.service';
import * as moment from 'moment';
import { ContactosService } from 'src/app/modules/contactos/services/contactos.service';
import { ActividadesService } from '../../services/actividades/actividades.service';

@Component({
  selector: 'actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  @ViewChild(ActividadesPorProyectoComponent, {static: true}) actividadesPorProyecto: ActividadesPorProyectoComponent;
  isCollapsed: boolean;
  proyecto = new Proyecto({});
  proyectos: Proyecto[];
  editando = false;
  proyectosPadre = [];
  area;
  etapa;
  comunasLista;
  comunaSeleccionada = {};
  responsableSeleccionado = {};
  compromisosGobierno;
  objetivosImpacto;
  contactosSimple;
  areas;
  areaSeleccionada;
  dependencias;
  grupos;
  prioridadesMinisteriales;
  
  constructor(private activatedRoute: ActivatedRoute, private proyectosService:ProyectosService, private comunasService: ComunasService, private organigramaService: OrganigramaService, private contactosService: ContactosService, private actividadesService: ActividadesService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.proyectosService.getProyectoPorId(params.get("idProyecto")).subscribe((proyecto: Proyecto) =>{
        this.proyecto = proyecto;
        this.proyectosService.proyectosPorPlan(proyecto.idPlan,proyecto.idJurisdiccion).subscribe((proyectos: any[]) =>{
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
      this.organigramaService.getOrganigrama().subscribe(organigrama =>{
        this.dependencias = organigrama;
      });
      this.comunasService.getComunas().subscribe(comunas =>{
        this.comunasLista = comunas;
      });
      this.proyectosService.getAreas().subscribe((areas: any[]) =>{
        let areasCorrectas = [];
        for (let a = 0; a < areas.length; a++) {
          const area = areas[a];
          
          if(area.anio == this.proyecto.anio){
            areasCorrectas.push(area)
          }
        }
        this.areas = areasCorrectas;//Traer las del ano seleccionado, sino en el listado se repiten por cada ano
      });
      this.contactosService.getContactosSimple().subscribe(contactosSimple =>{
        this.contactosSimple = contactosSimple;
      });
      this.proyectosService.getPoaGrupos().subscribe(poaGrupos =>{
        this.grupos = poaGrupos;
      });
      this.proyectosService.getPrioridadesMinisteriales().subscribe(prioridadesMinisteriales =>{
        this.prioridadesMinisteriales = prioridadesMinisteriales;
      });
    });
  }

  ngOnInit() {
    
  }

  guardarProyecto(){
    this.proyecto.fechaInicio = moment(this.proyecto.fechaInicio).format("DD/MM/YYYY");
    this.proyecto.fechaFin = moment(this.proyecto.fechaFin).format("DD/MM/YYYY");
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

  comunaPorId(idComuna){
    if(!this.comunasLista) return;
    for (let i = 0; i < this.comunasLista.length; i++) {
      const comuna = this.comunasLista[i];
      if(comuna._id == idComuna){
        return comuna.nombre;
      }
    }
  }

  responsablePorId(idResponsable){//Esto deberia hacerse de otra forma
    if(!this.contactosSimple) return;
    for (let i = 0; i < this.contactosSimple.length; i++) {
      const contacto = this.contactosSimple[i];
      if(contacto._id == idResponsable){
        return contacto.apellidos + ", " + contacto.nombre;
      }
    }
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

  filtrarLista(array,items): any[] {
    if(!items || !array) return array;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      array = array.filter(i => i._id !== item);
    }
    return array;
  }
}

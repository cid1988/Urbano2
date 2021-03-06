import { Component, OnInit, Input } from '@angular/core';
import { CalendarioService } from '../../services/calendario/calendario.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { Reunion } from '../../models/reunion';
import { Router} from "@angular/router"
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalDetalleReunionComponent } from '../modals/modal-detalle-reunion/modal-detalle-reunion.component';
import { ModalCrearReunionComponent } from '../modals/modal-crear-reunion/modal-crear-reunion.component';
import * as moment from 'moment';

declare var $:any;

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  
  calendarEl
  reuniones = [];
  series;
  @Input() calendar;
  altoDePantalla: any;
  reunion = new Reunion({});
  nuevaReunion = new Reunion({});
  tiposReunion = [];
  cargando = true;
  bsModalRef: BsModalRef;

  constructor(private calendarioService: CalendarioService, private router: Router, private modalService: BsModalService) {
    this.calculos();
  }
  
  calculos(){
    this.calendarioService.getTiposReunion().subscribe((tiposReunion: any[]) =>{
      this.tiposReunion = tiposReunion;
    })
    this.calendarioService.getSeriesReunion().subscribe((series: any[]) =>{
      this.series = series;
    })
    this.calendarioService.getReuniones().subscribe((reuniones: any[]) =>{
      this.reuniones = reuniones;
      this.llamarCalendario(this.reuniones,this.reunion,this.nuevaReunion);
    },error =>{
      console.log(error);
    })
  }

  llamarCalendario(reuniones,reunion,nuevaReunion){
    this.calendarEl = document.getElementById('calendar');
    this.calendar = new Calendar(this.calendarEl, {
      plugins: [ dayGridPlugin,timeGridPlugin,interactionPlugin ],
      defaultView: "timeGridWeek",
      height: 'parent',
      events: this.reuniones,
      locale: 'es',
      header: {
        left: 'prev,next dayGridMonth,timeGridWeek,timeGridDay,today',
        right: 'title',
        center: 'reservaButton,solicitarButton refrescarButton editarButton',
      },
      buttonText: {
        today:    'Hoy',
        month:    'Mes',
        week:     'Semana',
        day:      'Dia',
        list:     'Lista'
      },
      customButtons: {
        reservaButton: {
          text: 'Reserva',
          click: function() {
            alert('clicked the custom button!');
          }
        },
        solicitarButton: {
          text: 'Solicitar',
          click: function() {
            $('#modalSolicitarReunion').modal('show');
            // alert('clicked the custom button!');
          }
        },
        refrescarButton: {
          text: 'Refrescar',
          click: () => {
            this.actualizarCalendario();
            alert('Actualizando calendario');
          }
        },
        editarButton: {
          text: 'Editar',
          click: function() {
            alert('clicked the custom button!');
          }
        }
      },
      eventTextColor: 'white',
      hiddenDays: [0],
      minTime: "08:00:00",
      maxTime: "23:00:00",
      allDaySlot: false,
      nowIndicator: true,
      eventTimeFormat: {hour: '2-digit',minute: '2-digit'},
      editable: true,
      // titleFormat: "sasa",
      eventColor: reuniones.color,
      slotDuration: '00:30:00',
      defaultTimedEventDuration: 15,
      snapDuration: '00:15:00',
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short'
      },
      dateClick: (event) => {
        var dia = new Date(event.date);

        nuevaReunion = {
          fecha: dia,
          desdeDate: dia,
          hastaDate: new Date(dia.getTime() + 1800000),
          desdeHora: dia,
          hastaHora: dia
        }

        const initialState = {nuevaReunion};
        this.bsModalRef = this.modalService.show(ModalCrearReunionComponent, {initialState, class: 'modal-lg'});
        this.bsModalRef.content.action.subscribe((status) => {
          if(status) this.actualizarCalendario();
        });
      },
      eventClick: (event) => {
        console.log(event)
        reunion = {

          _id: event.event.extendedProps._id,
          _serie: event.event.extendedProps._serie,
          fecha: event.event.extendedProps.fecha,
          reunion: event.event.extendedProps.reunion,
          desdeDate: new Date(event.event.extendedProps.desdeDate),
          hastaDate: new Date(event.event.extendedProps.hastaDate),
          desdeHora: new Date(event.event.extendedProps.desdeDate),
          hastaHora: new Date(event.event.extendedProps.hastaDate),
          color: event.event.backgroundColor
        }
        
        // reunion.titulo = event.event.title
        // reunion.start = event.event.start
        // reunion.end = event.event.end
        // reunion.desdeDate = event.event.extendedProps.desdeDate
        // reunion.hastaDate = event.event.extendedProps.hastaDate

        const initialState = {reunion};
        this.bsModalRef = this.modalService.show(ModalDetalleReunionComponent, {initialState, class: 'modal-lg'});
        this.bsModalRef.content.action.subscribe((status) => {
          // if(status) this.getActividades(this.proyecto._id);
        });
        
      },
      eventResize: (event) => {
        if(confirm("Esta seguro de modificar la reunion?")){
          var a = event.event.extendedProps;
          var objeto = {
            id: event.event.id,
            titulo: event.event.title,
            oldStart: event.event.start.getTime(),
            desdeDate: event.event.start.getTime(),
            hastaDate: event.event.end.getTime(),
            desdeHora: (event.event.start.getHours() + ":" + event.event.start.getMinutes()),
            hastaHora: (event.event.end.getHours() + ":" + event.event.end.getMinutes()),
            fechaCreacion: a.fechaCreacion,
            usuarioCreacion: a.usuarioCreacion,//Hacer desde el backend
            reunion: a.reunion,
            fecha: a.fecha
          }
          this.actualizarReunion(objeto);
        }else{
          event.revert();
        }
      },
      eventDragStop: (event) => {

      },
      eventDrop: (event) => {
        if(confirm("Esta seguro de modificar la reunion?")){
          var a = event.oldEvent.extendedProps;
          var objeto = {
            id: event.event.id,
            titulo: event.event.title,
            oldStart: event.oldEvent.start.getTime(),
            desdeDate: event.event.start.getTime(),
            hastaDate: event.event.end.getTime(),
            desdeHora: (event.event.start.getHours() + ":" + event.event.start.getMinutes()),
            hastaHora: (event.event.end.getHours() + ":" + event.event.end.getMinutes()),
            fechaCreacion: a.fechaCreacion,
            fechaModificacion: new Date(),
            usuarioCreacion: a.usuarioCreacion,//Hacerlo desde el backend
            reunion: a.reunion,
            fecha: a.fecha
          }
          this.actualizarReunion(objeto);
        }else{
          event.revert()
        }
      },
      views: {
        dayGrid: {
          // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
        },
        timeGrid: {
          // options apply to timeGridWeek and timeGridDay views
        },
        week: {
          titleFormat: { year: 'numeric', month: 'long' },
        },
        day: {
          // options apply to dayGridDay and timeGridDay views
        },
        dayGridMonth: { // name of view
          
        }
      },
    });
    this.calendar.render();
    this.cargando = false;
  }
  
  ngOnInit() {
    this.altoDePantalla = window.innerHeight;
  }

  guardarReunion(reunion){
    this.calendarioService.guardarNuevaReunion(reunion).subscribe(data =>{

    })
  }

  actualizarReunion(reunion){
    this.cargando = true;
    this.calendarioService.actualizarReunion(reunion).subscribe(data =>{
      this.actualizarCalendario();
      this.cargando = false;
    })
  }

  actualizarCalendario(){
    this.calendar.destroy();
    this.calculos();
  }

  irMaestros(){
    this.router.navigateByUrl('/rdg/maestros');
  }
}

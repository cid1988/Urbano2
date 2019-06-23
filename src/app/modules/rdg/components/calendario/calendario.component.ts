import { Component, OnInit, Input } from '@angular/core';
import { CalendarioService } from '../../services/calendario.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Calendar } from '@fullcalendar/core';
import { Reunion } from '../../models/reunion';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  calendarEl
  reuniones: Reunion[] = [];
  series;
  @Input() calendar;
  altoDePantalla: any;

  // calendarOptions:Object = {
  //   header: {
  //     left: 'prev,next today myCustomButton',
  //     right: 'dayGridMonth,timeGridWeek,timeGridDay',
  //     center: 'title',
  //   },
  //   // height: 'parent',
  //   fixedWeekCount : true,
  //   // defaultDate: '2019-06-16',
  //   editable: true,
  //   // eventLimit: false, // allow "more" link when too many events
  //   events: [],
  //   eventClick: (calEvent, jsEvent, view) => {
  //     alert(calEvent.start);
  //   },
  //   eventDragStop(model) {
  //     console.log(model);
  //   },
  //   dateClick(model) {
  //     console.log(model);
  //   },
  //   updateEvents() {
  //     this.eventsModel = [{
  //       title: 'Updaten Event',
  //       start: this.yearMonth + '-08',
  //       end: this.yearMonth + '-10'
  //     }];
  //   },
  //   // clearEvents() {
  //   //   this.events = [];
  //   // },
  //   // loadEvents() {
  //   //   this.eventService.getEvents().subscribe(data => {
  //   //     this.events = data;
  //   //   });
  //   // }
  // };

  constructor(private calendarioService: CalendarioService) {
    this.calendarioService.getSeriesDeReunion().subscribe(series =>{
      this.series = series;
    })
    this.calendarioService.getReuniones().subscribe(reuniones =>{
      for (let i = 0; i < reuniones.length; i++) {
        let reunion = reuniones[i];
        
        reunion.start = reunion.desdeDate;
        reunion.end = reunion.hastaDate;
        reunion.title = reunion.usuarioCreacion;

        if(reunion.reunion == "58ad8258f90904c9043b0a88"){
          reunion.color = "rgb(234, 111, 0, 0.5)"
        }else if(reunion.reunion == "5cd5ef08a0acd8a5611fd64d"){
          reunion.color = "rgb(91, 190, 136, 0.5)";
        }else if(reunion.reunion == "58ad81b6f90904c9043b0a82"){
          reunion.color = "rgb(91, 190, 136, 0.5)";
        }else if(reunion.reunion == "58ad8249f90904c9043b0a87"){
          reunion.color = "rgb(234, 111, 0, 0.5)"
        }
      }
      this.llamarCalendario(reuniones);
    },error =>{
      alert(error);
    })
  }

  llamarCalendario(reuniones){
    this.calendarEl = document.getElementById('calendar');
    this.calendar = new Calendar(this.calendarEl, {
      plugins: [ dayGridPlugin,timeGridPlugin ],
      defaultView: "timeGridWeek",
      height: 'parent',
      events: reuniones,
      locale: 'es',
      header: {
        left: 'prev,next,dayGridMonth,timeGridWeek,timeGridDay,today',
        right: 'title',
        center: 'reservaButton,solicitarButton',
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
      titleFormat: "sasa",
      eventColor: reuniones.color,
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short'
      },
      dateClick(model) {
        console.log(model);
      },
      eventDragStop(model) {
        console.log(model);
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
      }
    });
    this.calendar.render();
  }
  
  ngOnInit() {
    this.altoDePantalla = window.innerHeight;
    console.log(this.altoDePantalla)
    this.llamarCalendario(this.reuniones)
  }
}

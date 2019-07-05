import { Component, OnInit, Input } from '@angular/core';
import { CalendarioService } from '../../services/calendario.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Calendar } from '@fullcalendar/core';
import { Validators } from '@angular/forms';
import interactionPlugin from '@fullcalendar/interaction';

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

  // calendarOptions:Object = {
  //   header: {
  //     left: 'prev,next today myCustomButton',
  //     right: 'dayGridMonth,timeGridWeek,timeGridDay',
  //     center: 'title',
  //   },
  //   // height: 'parent',
  //   fixedWeekCount : true,
  //   // defaultDate: '2019-06-16',
  //   // eventLimit: false, // allow "more" link when too many events
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
      for (let i = 0; i < series.length; i++) {
        let serie = series[i];
        
        serie.color = this.calcularColor(serie.tipo);
      }
      this.series = series;
    })
    this.calendarioService.getReuniones().subscribe(reuniones =>{
      for (let i = 0; i < reuniones.length; i++) {
        let reunion = reuniones[i];
        
        reunion.start = reunion.desdeDate;
        reunion.end = reunion.hastaDate;
        reunion.color = this.calcularColor(reunion.reunion.tipo);
      }
      this.llamarCalendario(reuniones);
    },error =>{
      alert(error);
    })
  }
  
  calcularColor(reunion){
    if(!reunion) return;
    if(reunion == "coordinacion"){
      return "rgb(91, 190, 136, 0.5)"
    }else if(reunion == "previa"){
      return "rgb(168, 85, 198, 0.5)";
    }else if(reunion == "seguimientoJefatura"){
      return "rgb(141, 98, 47, 0.5)";
    }else if(reunion == "especificasJefatura"){
      return "rgb(167, 167, 167, 0.5)";
    }else if(reunion == "seguimiento"){
      return "rgb(234, 111, 0, 0.5)";
    }else if(reunion == "especificas"){
      return "rgb(43, 130, 255, 0.5)";
    }else if(reunion == "visitaObra"){
      return "rgb(38, 84, 115, 0.5)";
    }else if(reunion == "eventual"){
      return "rgb(173, 172, 58, 0.5)";
    }
  };

  llamarCalendario(reuniones){
    this.calendarEl = document.getElementById('calendar');
    this.calendar = new Calendar(this.calendarEl, {
      plugins: [ dayGridPlugin,timeGridPlugin,interactionPlugin ],
      defaultView: "timeGridWeek",
      height: 'parent',
      events: reuniones,
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
            alert('clicked the custom button!');
          }
        },
        refrescarButton: {
          text: 'Refrescar',
          click: function() {
            alert('clicked the custom button!');
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
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short'
      },
      dateClick($event) {
        console.log($event);
      },
      eventClick: function(info) {
        console.log(info)
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
  }
}

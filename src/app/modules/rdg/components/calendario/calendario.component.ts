import { Component, OnInit, Input } from '@angular/core';
import { CalendarioService } from '../../services/calendario.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import { Reunion } from '../../models/reunion';

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
  model: Reunion;
  nuevaReunion: Reunion;
  tiposReunion = {};
  cargando = true;

  constructor(private calendarioService: CalendarioService) {
    this.calculos();
  }
  
  calculos(){
    this.calendarioService.getTiposReunion().subscribe((tiposReunion: any[]) =>{
      this.tiposReunion = tiposReunion;
    })
    this.calendarioService.getSeriesDeReunion().subscribe((series: any[]) =>{
      for (let i = 0; i < series.length; i++) {
        let serie = series[i];
        
        serie.color = this.calcularColor(serie.tipo);
      }
      this.series = series;
    })
    this.calendarioService.getReuniones().subscribe((reuniones: any[]) =>{
      for (let i = 0; i < reuniones.length; i++) {
        let reunion = reuniones[i];
        
        reunion.start = reunion.desdeDate;
        reunion.end = reunion.hastaDate;
        reunion.color = this.calcularColor(reunion.reunion.tipo);
        this.reuniones = reuniones;
      }
      this.llamarCalendario(this.reuniones,this.model,this.nuevaReunion);
    },error =>{
      alert(error);
    })
  }

  calcularColor(reunion){
    if(!reunion) return "";
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
    }else if(reunion == "poa"){
      return "#265473";
    }
  };

  llamarCalendario(reuniones,model,nuevaReunion){
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
      dateClick(event) {
        var dia = new Date(event.date);
        var milliseconds = dia.getTime(); 
        var millisecondsEnd = dia.setMinutes(dia.getMinutes() + 30 );
        nuevaReunion.titulo = (event.date);
        nuevaReunion.desdeDate = milliseconds;
        nuevaReunion.hastaDate = millisecondsEnd;
        nuevaReunion.reunion = "";
        $('#modalNuevaReunion').modal({show:true});
      },
      eventClick: (event) => {
        console.log(event)
        model.titulo = event.event.title
        
        model.start = event.event.start
        model.end = event.event.end
        model.color = "red"
        $('#modalDetalleReunion').modal({show:true});
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
            reunion: a.reunion._id,
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
          var a = event.oldEvent.extendedProps
          var objeto = {
            id: event.event.id,
            titulo: event.event.title,
            oldStart: event.oldEvent.start.getTime(),
            desdeDate: event.event.start.getTime(),
            hastaDate: event.event.end.getTime(),
            desdeHora: (event.event.start.getHours() + ":" + event.event.start.getMinutes()),
            hastaHora: (event.event.end.getHours() + ":" + event.event.end.getMinutes()),
            reunion: a.reunion._id,
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
}

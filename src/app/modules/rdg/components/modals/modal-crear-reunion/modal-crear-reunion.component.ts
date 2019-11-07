import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CalendarioService } from '../../../services/calendario/calendario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-crear-reunion',
  templateUrl: './modal-crear-reunion.component.html',
  styleUrls: ['./modal-crear-reunion.component.css']
})
export class ModalCrearReunionComponent implements OnInit {

  @Output() action = new EventEmitter();
  series;
  nuevaReunion

  constructor(private calendarioService: CalendarioService, public bsModalRef: BsModalRef) {
    this.calendarioService.getSeriesReunion().subscribe((series: any[]) =>{
      this.series = series;
    })
  }

  ngOnInit() {

  }

  guardar(formNuevaReunion: NgForm){
    this.nuevaReunion.desdeDate = new Date(formNuevaReunion.value.desdeDate).getTime();//Se guarda en formato milliseconds
    this.nuevaReunion.hastaDate = new Date(formNuevaReunion.value.hastaDate).getTime();//Se guarda en formato milliseconds
    this.nuevaReunion.desdeHora = this.nuevaReunion.desdeHora.getHours() + ":" + this.nuevaReunion.desdeHora.getMinutes();//Se guarda en formato string
    this.nuevaReunion.hastaHora = this.nuevaReunion.hastaHora.getHours() + ":" + this.nuevaReunion.hastaHora.getMinutes();//Se guarda en formato string
    this.nuevaReunion.fechaCreacion = new Date().toString();//Ver si se va a hacerse desde el backend
    this.nuevaReunion.reunion = formNuevaReunion.value.reunion;
    this.nuevaReunion.lugar = formNuevaReunion.value.lugar;
    this.nuevaReunion.usuarioCreacion = "pperello";//Traer desde el backend
    this.calendarioService.guardarNuevaReunion(this.nuevaReunion).subscribe(data => {
      this.action.emit(true);
      this.bsModalRef.hide();
    });
  }
}
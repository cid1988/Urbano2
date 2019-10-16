import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
  selector: 'modal-nueva-fecha',
  templateUrl: './modal-nueva-fecha.component.html',
  styleUrls: ['./modal-nueva-fecha.component.css']
})
export class ModalNuevaFechaComponent implements OnInit {

  fecha;
  @Output() action = new EventEmitter();
  
  constructor(public bsModalRef: BsModalRef) {}
 
  ngOnInit() {
    
  }

  agregarFecha(fechaForm){
    fechaForm.value.fechaInicio = moment(fechaForm.value.fechaInicio).format("DD/MM/YYYY");
    fechaForm.value.fechaFin = moment(fechaForm.value.fechaFin).format("DD/MM/YYYY");
    this.action.emit(fechaForm);
    this.bsModalRef.hide();
  }

  comprobarFechas(){
    //La fecha de inicio no puede ser mas grande que la del final
  }
}

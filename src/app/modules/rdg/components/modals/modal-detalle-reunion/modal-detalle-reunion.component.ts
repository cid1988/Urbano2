import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Reunion } from '../../../models/reunion';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-detalle-reunion',
  templateUrl: './modal-detalle-reunion.component.html',
  styleUrls: ['./modal-detalle-reunion.component.css']
})
export class ModalDetalleReunionComponent implements OnInit {

  @Output() action = new EventEmitter();
  reunion = new Reunion({});
  editando = false;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    console.log(this.reunion)
  }

  guardar(){
    // Controlar que no s epueda guardar una fecha de fin anterior a la de inicio y horario tampoco
    // this.hito.fechaInicio = moment(this.hito.fechaInicio).format("DD/MM/YYYY");
    // this.hito.fechaFin = moment(this.hito.fechaFin).format("DD/MM/YYYY");
    // this.actividadesService.crearActividad(this.model).subscribe(data =>{
    //   this.action.emit(true);
    //   this.bsModalRef.hide();
    // },error=>{
    //   console.log(error)
    // });
  }
}

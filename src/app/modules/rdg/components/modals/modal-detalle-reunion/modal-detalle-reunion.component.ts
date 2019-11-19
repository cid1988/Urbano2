import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { CalendarioService } from '../../../services/calendario/calendario.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-modal-detalle-reunion',
  templateUrl: './modal-detalle-reunion.component.html',
  styleUrls: ['./modal-detalle-reunion.component.css']
})
export class ModalDetalleReunionComponent implements OnInit {

  @Output() action = new EventEmitter();
  reunion;
  editando = false;

  constructor(private calendarioService: CalendarioService, public bsModalRef: BsModalRef, public router:Router) { }

  ngOnInit() {
    
  }

  guardar(detalleReunionForm: NgForm){
    this.reunion._id = detalleReunionForm.value._id;
    this.reunion.desdeDate = new Date(detalleReunionForm.value.desdeDate).getTime();
    this.reunion.hastaDate = new Date(detalleReunionForm.value.hastaDate).getTime();
    this.reunion.desdeHora = detalleReunionForm.value.desdeHora
    this.reunion.hastaHora = detalleReunionForm.value.hastaHora
    this.reunion.titulo = detalleReunionForm.value.titulo
    this.reunion.lugar = detalleReunionForm.value.lugar
    this.reunion.reunion = detalleReunionForm.value.reunion
    this.reunion.fechaCreacion = new Date()//Cambiar
    this.reunion.usuarioCreacion = "pperello"//Cambiar
    this.calendarioService.actualizarReunion(this.reunion).subscribe(data =>{
      this.action.emit(true);
      this.bsModalRef.hide();
    },error=>{
      console.log(error)
    });
  }
  irCita(){
    this.bsModalRef.hide();
    this.router.navigateByUrl('/rdg/cita/'+this.reunion._id);
  }
  irMinuta(){
    this.bsModalRef.hide();
    this.router.navigateByUrl('/rdg/minuta/'+this.reunion._id);
  }
  irTemario(){
    this.bsModalRef.hide();
    this.router.navigateByUrl('/rdg/temario/'+this.reunion._id);
  }
}

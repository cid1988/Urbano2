import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Compromiso } from '../../../models/compromiso';
import { environment } from 'src/environments/environment';
import { CalendarioService } from '../../../services/calendario/calendario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-compromiso',
  templateUrl: './modal-compromiso.component.html',
  styleUrls: ['./modal-compromiso.component.css']
})
export class ModalCompromisoComponent implements OnInit {
  compromiso;
  @Output() action = new EventEmitter();
  config = environment.tinymceConfig;
  
  constructor(public bsModalRef: BsModalRef, private calendarioService: CalendarioService) {
    this.config.min_height=200;
    this.config.max_height=400;
    this.config.toolbar= 'undo redo | bold italic underline | fontselect fontsizeselect | bullist numlist outdent indent |';
  }

  ngOnInit() {
    
  }
  guardar(detalleReunionForm:NgForm){
    this.compromiso.fecha=detalleReunionForm.value.fecha;
    this.compromiso.titulo=detalleReunionForm.value.titulo;
    this.compromiso.poa=detalleReunionForm.value.poa;
    this.compromiso.importante=detalleReunionForm.value.importante;
    this.compromiso.tarea=detalleReunionForm.value.tarea;
    this.compromiso.proximaReunion=detalleReunionForm.value.proximaReunion;
    if(this.compromiso.id==''){
      delete this.compromiso.id
      this.calendarioService.nuevoCompromiso(this.compromiso).subscribe(data=>{
        this.bsModalRef.hide();
      })
    }else {
      this.calendarioService.actualizarCompromiso(this.compromiso).subscribe(data=>{
        this.bsModalRef.hide();
      })
    }
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProyectosService } from '../../../services/proyectos/proyectos.service';

@Component({
  selector: 'app-modal-crear-proyecto',
  templateUrl: './modal-crear-proyecto.component.html',
  styleUrls: ['./modal-crear-proyecto.component.css']
})
export class ModalCrearProyectoComponent implements OnInit {

  proyecto;
  proyectosPadre;
  @Output() action = new EventEmitter();
  
  constructor(public bsModalRef: BsModalRef, private proyectosService: ProyectosService) {}
 
  ngOnInit() {
    
  }

  guardarProyecto(){
    this.proyectosService.crearProyecto(this.proyecto).subscribe(data =>{
      this.action.emit(true);
      this.bsModalRef.hide();
    })
  }
}

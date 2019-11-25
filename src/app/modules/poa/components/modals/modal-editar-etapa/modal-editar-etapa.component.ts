import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActividadesService } from '../../../services/actividades/actividades.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Etapa } from '../../../models/etapa';

@Component({
  selector: 'modal-editar-etapa',
  templateUrl: './modal-editar-etapa.component.html',
  styleUrls: ['./modal-editar-etapa.component.css']
})
export class ModalEditarEtapaComponent implements OnInit {

  @Input() etapa = new Etapa({});
  @Output() action = new EventEmitter();
  etapasList = [{
    nombre: "Sin etapa"
  },{
    nombre: "Ley"
  },{
    nombre: "Proyecto"
  },{
    nombre: "Anteproyecto"
  },{
    nombre: "Obra"
  },{
    nombre: "Inauguracion"
  }];
  
  constructor(private actividadesService: ActividadesService, public bsModalRef: BsModalRef) { }

  ngOnInit() {
    console.log(this.etapa)
  }

  guardarEtapa(){
    this.actividadesService.editarEtapa(this.etapa).subscribe(data =>{
      this.action.emit(true);
      this.bsModalRef.hide();
    },error=>{
      console.log(error)
    });
  }
}

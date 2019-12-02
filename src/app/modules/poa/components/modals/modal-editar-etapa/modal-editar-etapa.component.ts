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
  @Input() etapasDelProyecto;
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
    
  }

  guardarEtapa(){
    this.actividadesService.editarEtapa(this.etapa).subscribe(data =>{
      this.action.emit(true);
      this.bsModalRef.hide();
    },error=>{
      console.log(error)
    });
  }

  filtrarLista(){
    let array = this.actividadesService.filtrarLista(this.etapasList,this.etapasDelProyecto);
    array.unshift({nombre: this.etapa.nombre});
    return array;
  }
}

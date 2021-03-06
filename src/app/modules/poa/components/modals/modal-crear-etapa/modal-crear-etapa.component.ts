import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActividadesService } from '../../../services/actividades/actividades.service';

@Component({
  selector: 'modal-crear-etapa',
  templateUrl: './modal-crear-etapa.component.html',
  styleUrls: ['./modal-crear-etapa.component.css']
})
export class ModalCrearEtapaComponent implements OnInit {

  @Input() etapa;
  @Input() etapasDelProyecto;
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

  constructor(private actividadesService: ActividadesService, public bsModalRef: BsModalRef) {}
 
  ngOnInit() {
    
  }

  guardarEtapa(){
    this.actividadesService.crearEtapa(this.etapa).subscribe(data =>{
      this.action.emit(true);
      this.bsModalRef.hide();
    },error=>{
      console.log(error)
    });
  }

  filtrarLista(){
    return this.actividadesService.filtrarLista(this.etapasList,this.etapasDelProyecto)
  }
}

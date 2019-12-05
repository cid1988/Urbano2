import { Component, OnInit, Input } from '@angular/core';
import { Compromiso } from '../../models/compromiso';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalCompromisoComponent } from '../modals/modal-compromiso/modal-compromiso.component';

@Component({
  selector: 'app-compromisos',
  templateUrl: './compromisos.component.html',
  styleUrls: ['./compromisos.component.css']
})
export class CompromisosComponent implements OnInit {

  @Input() compromiso:Compromiso;
  @Input() idMinuta:String;
  @Input() pendiente:Boolean=false;
  bsModalRef: BsModalRef;
  
  constructor(private modalService: BsModalService) { }

  ngOnInit() { 
  }

  editar(){
    var compromiso = this.compromiso;
    const initialState = { compromiso }
    this.bsModalRef = this.modalService.show(ModalCompromisoComponent, {initialState, class: 'modal-lg'});
    this.bsModalRef.content.action.subscribe((status) => {
      // if(status) this.getActividades(this.proyecto._id);
    });
  }

}

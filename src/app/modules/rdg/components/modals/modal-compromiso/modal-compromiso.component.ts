import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Compromiso } from '../../../models/compromiso';

@Component({
  selector: 'app-modal-compromiso',
  templateUrl: './modal-compromiso.component.html',
  styleUrls: ['./modal-compromiso.component.css']
})
export class ModalCompromisoComponent implements OnInit {
  compromiso=new Compromiso({});
  @Output() action = new EventEmitter();
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}

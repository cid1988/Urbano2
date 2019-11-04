import { Component, OnInit } from '@angular/core';
import { CalendarioService } from '../../services/calendario/calendario.service';
import { ActivatedRoute, Router} from "@angular/router"
import { Cita } from "../../models/cita"


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  lista=[]
  cita= {} as Cita;
  constructor( private calendarioService: CalendarioService, private actRoute:ActivatedRoute) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.calendarioService.getCita(id).subscribe((data:Cita)=>{
      this.cita=data;
    })
  }

  ngOnInit() {
  }

}

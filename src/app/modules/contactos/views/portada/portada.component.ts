import { Component, OnInit } from '@angular/core';
import { ContactosService } from '../../services/contactos.service';
import { Contacto } from '../../models/contacto';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit {
  contactos:Contacto[]

  constructor(private contactoService: ContactosService) { }

  ngOnInit() {
    this.contactoService.getContactos().subscribe((data:Contacto[])=>{
      this.contactos=data;
    })
  }

}

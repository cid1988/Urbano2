import { Component, OnInit, Input } from '@angular/core';
import { ContactosService } from '../../services/contactos.service';
import { Contacto } from '../../models/contacto';

@Component({
  selector: 'etiqueta-correo',
  templateUrl: './etiqueta-correo.component.html',
  styleUrls: ['./etiqueta-correo.component.css']
})
export class EtiquetaCorreoComponent implements OnInit {

  @Input() idContacto:String;
  @Input() maestro:Boolean;
  contacto= new Contacto();

  constructor(private contactoService: ContactosService) { }

  ngOnInit() {
    this.contactoService.getContacto(this.idContacto).subscribe((data:Contacto)=>{
      this.contacto=data;
    })
  }

}

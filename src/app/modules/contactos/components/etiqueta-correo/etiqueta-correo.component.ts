import { Component, OnInit, Input } from '@angular/core';
import { ContactosService } from '../../services/contactos.service';
import { Contacto } from '../../models/contacto';

@Component({
  selector: 'etiqueta-correo',
  templateUrl: './etiqueta-correo.component.html',
  styleUrls: ['./etiqueta-correo.component.css']
})
export class EtiquetaCorreoComponent implements OnInit {

  @Input() idContacto: String;
  @Input() maestro: Boolean;
  contacto = new Contacto({});
  correo:String

  constructor(private contactoService: ContactosService) { }

  ngOnInit() {
    this.contactoService.getContacto(this.idContacto).subscribe((data:Contacto)=>{
      this.contacto = data;
      if(this.contacto && this.contacto.correos){
        for (let index = 0; index < this.contacto.correos.length; index++) {
          if(this.contacto.correos[index].checked){
            this.correo = this.contacto.correos[index].valor;
            break;
          }else{
            if(this.contacto.correos[index].nombre == "Email oficial"){
              this.correo = this.contacto.correos[index].valor;
            }
          }
        }
      }
    })
  }
}

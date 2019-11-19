import { Component, OnInit, Input } from '@angular/core';
import { ContactosService } from '../../services/contactos.service';
import { Contacto } from '../../models/contacto';

@Component({
  selector: 'etiqueta-correo',
  templateUrl: './etiqueta-correo.component.html',
  styleUrls: ['./etiqueta-correo.component.css']
})
export class EtiquetaCorreoComponent implements OnInit {

  @Input() listaContactos: String;
  @Input() maestro: Boolean;
  @Input() editando: Boolean=false;
  contactos:Contacto[]=[];

  constructor(private contactoService: ContactosService) { }

  ngOnInit() {
    this.contactoService.getContactosSimple().subscribe((data:Contacto[])=>{
      this.contactos = data;
    })
  }

  nombreCompleto(id){
    for (let index = 0; index < this.contactos.length; index++) {
      if(this.contactos[index]._id == id){
        return this.contactos[index].nombreCompleto;
      }
    }
  }
  correo(id){
    for (let index = 0; index < this.contactos.length; index++) {
      if(this.contactos[index]._id == id){
        var correo:String = 'No tiene correo asignado';
        if(this.tieneCorreo(id)){
          for (let c = 0; c < this.contactos[index].correos.length; index++) {
            if(this.contactos[index].correos[c].checked){
                correo = this.contactos[index].correos[c].valor;
                break;
            }else{
                if(this.contactos[index].correos[c].nombre == "Email oficial"){
                    correo = this.contactos[index].correos[c].valor;
                }
            }
          }
          return correo;
        }else return correo;
      }
    }
  }
  tieneCorreo(id){
    for (let index = 0; index < this.contactos.length; index++) {
      if(this.contactos[index]._id == id){
        if(this.contactos[index].correos && this.contactos[index].correos.length>0){
            return true;
        }else return false;
      }
    }
  }
  quitar(elemento, lista){
    lista.splice(lista.indexOf(elemento), 1);
  }
}

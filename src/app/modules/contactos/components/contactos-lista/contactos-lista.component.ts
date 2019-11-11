import { Component, OnInit, Input } from '@angular/core';
import { ContactosService } from '../../services/contactos.service';

@Component({
  selector: 'contactos-lista',
  templateUrl: './contactos-lista.component.html',
  styleUrls: ['./contactos-lista.component.css']
})
export class ContactosListaComponent implements OnInit {

  @Input() arrayContactos: [];
  @Input() editando: string;
  contactos;

  constructor(private contactosService: ContactosService) {
    this.contactosService.getContactosSimple().subscribe(contactos =>{
      this.contactos = contactos;
    })
  }

  ngOnInit() {
    
  }

  contactoPorId(idContacto){
    if(!this.contactos) return;
    for (let c = 0; c < this.contactos.length; c++) {
      const contacto = this.contactos[c];
      
      if(contacto._id == idContacto){
        return contacto.nombreCompleto;
      }
    }
  }

  quitar(elemento, lista){
    lista.splice(lista.indexOf(elemento), 1);
  }
}

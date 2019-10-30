import { Component, OnInit, Input } from '@angular/core';
import { ContactosService } from '../../services/contactos.service';
import { Contacto } from '../../models/contacto';

@Component({
  selector: 'card-contacto',
  templateUrl: './card-contacto.component.html',
  styleUrls: ['./card-contacto.component.css']
})
export class CardContactoComponent implements OnInit {

  contacto=new Contacto() as Object;
  @Input() idContacto: string;
  @Input() dataContacto: Contacto;

  constructor(private contactoService: ContactosService) { 
  }


  ngOnInit() {
    if(this.idContacto){
      this.contactoService.getContacto(this.idContacto).subscribe((data:Object)=>{
        this.contacto=data
      })
    }else{
      this.contacto=this.dataContacto;
    }
    
  }

}

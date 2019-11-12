import { Component, OnInit, Input } from '@angular/core';
import { ComunasService } from '../../services/comunas/comunas.service';

@Component({
  selector: 'comunas-lista-badge',
  templateUrl: './comunas-lista-badge.component.html',
  styleUrls: ['./comunas-lista-badge.component.css']
})
export class ComunasListaBadgeComponent implements OnInit {

  @Input() array: [];
  @Input() editando: string;
  comunas;

  constructor(private comunasService: ComunasService) {
    this.comunasService.getComunas().subscribe(comunas =>{
      this.comunas = comunas;
    })
  }

  ngOnInit() {
    
  }

  comunaPorId(idComuna){
    if(!this.comunas) return;
    for (let i = 0; i < this.comunas.length; i++) {
      const comuna = this.comunas[i];
      if(comuna._id == idComuna){
        return comuna.nombre;
      }
    }
  }

  quitar(elemento, lista){
    lista.splice(lista.indexOf(elemento), 1);
  }
}

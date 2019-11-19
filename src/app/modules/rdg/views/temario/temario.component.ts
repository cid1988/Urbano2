import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CalendarioService } from '../../services/calendario/calendario.service';
import { ActivatedRoute } from '@angular/router';
import { Temario } from '../../models/temario';
import { Reunion } from '../../models/reunion';

@Component({
  selector: 'app-temario',
  templateUrl: './temario.component.html',
  styleUrls: ['./temario.component.css']
})
export class TemarioComponent implements OnInit {
  editando:Boolean=false;
  temario = new Temario({});
  reunion= new Reunion({});
  config = environment.tinymceConfig;
  enviado:string='Nunca enviado'

  constructor(private calendarioService: CalendarioService, private actRoute: ActivatedRoute) { 
    
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.calendarioService.getTemarioPorReunion(id).subscribe((data:any)=>{
      this.temario=new Temario(data);
      if(data._datosReunion) this.reunion=new Reunion(data._datosReunion);
      else{
        this.calendarioService.getReunionPorID(id).subscribe((data:any)=>{
          this.reunion=new Reunion(data);
        })
      }
    })
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { CalendarioService } from '../../services/calendario/calendario.service';
import { ActivatedRoute } from '@angular/router';
import { Minuta } from '../../models/minuta';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-minutas',
  templateUrl: './minutas.component.html',
  styleUrls: ['./minutas.component.css']
})
export class MinutasComponent implements OnInit {
  compromisosAnteriores:Boolean=false;
  minuta=new Minuta({});
  config = environment.tinymceConfig;
  constructor(private calendarioService:CalendarioService, private actRoute:ActivatedRoute) { 
    const id = this.actRoute.snapshot.paramMap.get('id');
    console.log(id)
    this.calendarioService.getMinutaPorIdReunion(id).subscribe((data:Minuta)=>{
      if(data && data!=null){
        this.minuta=new Minuta(data)
      }else this.minuta=new Minuta({})
    })
  }

  ngOnInit() {
  }

}

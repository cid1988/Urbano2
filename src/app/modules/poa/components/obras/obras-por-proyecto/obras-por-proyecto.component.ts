import { Component, OnInit, Input } from '@angular/core';
import { ObrasService } from '../../../services/obras/obras.service';

@Component({
  selector: 'obras-por-proyecto',
  templateUrl: './obras-por-proyecto.component.html',
  styleUrls: ['./obras-por-proyecto.component.css']
})
export class ObrasPorProyectoComponent implements OnInit {

  obras;
  @Input() proyecto = {id: ""};

  constructor(private obrasService: ObrasService) {}

  ngOnInit() {
    this.getObras(this.proyecto);
  }

  getObras(proyecto){
    this.obrasService.actividadesPorProyecto(proyecto).subscribe(obras =>{
      this.obras = obras;
    },error =>{
      alert(error);
    })
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ProyectosService } from '../../../services/proyectos/proyectos.service';

@Component({
  selector: 'etapas-por-proyecto',
  templateUrl: './etapas-por-proyecto.component.html',
  styleUrls: ['./etapas-por-proyecto.component.css']
})
export class EtapasPorProyectoComponent implements OnInit {

  // etapas;
  // @Input() proyecto = {_id: ""};

  constructor(private proyectosService: ProyectosService) { }

  ngOnInit() {
    // this.getEtapas(this.proyecto)
  }

  // getEtapas(proyecto){
  //   this.proyectosService.etapasPorProyecto(proyecto).subscribe(etapas =>{
  //     this.etapas = etapas;
  //   },error =>{
  //     alert(error);
  //   })
  // }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActividadesService } from '../../../services/actividades/actividades.service';

@Component({
  selector: 'actividad-detalle',
  templateUrl: './actividad-detalle.component.html',
  styleUrls: ['./actividad-detalle.component.css']
})

export class ActividadDetalleComponent implements OnInit {

  actividad;
  editando = false;
  etapas = [];
  predecesores = [];

  constructor(private activatedRoute:ActivatedRoute, private actividadesService:ActividadesService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.actividadesService.getActividad(params.get("idActividad")).subscribe(actividad =>{
        this.actividad = actividad;
      });
      this.actividadesService.etapasPorProyecto(params.get("idProyecto")).subscribe(etapas =>{
        this.etapas = etapas;
      });
      this.actividadesService.actividadesPorProyecto(params.get("idProyecto")).subscribe(actividadesDelProyecto =>{
        this.predecesores = actividadesDelProyecto;
      });
    });
  }

  ngOnInit() {
  }

  guardar(form){
    this.actividadesService.guardarActividad(this.actividad).subscribe((data:any) =>{
      this.editando = false;
      alert(data.status);
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActividadesService } from '../../../services/actividades/actividades.service';

@Component({
  selector: 'app-actividad-detalle',
  templateUrl: './actividad-detalle.component.html',
  styleUrls: ['./actividad-detalle.component.css']
})
export class ActividadDetalleComponent implements OnInit {

  actividad;

  constructor(private activatedRoute:ActivatedRoute, private actividadesService:ActividadesService) {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.get("idActividad"))
      this.actividadesService.getActividad(params.get("idActividad")).subscribe(actividad =>{
        this.actividad = actividad;
      })
    });
  }

  ngOnInit() {
  }

}

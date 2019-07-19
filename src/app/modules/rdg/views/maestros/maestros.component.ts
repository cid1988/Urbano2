import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarioService } from '../../services/calendario.service';
import { MailHeaderComponent } from '../../components/mail-header/mail-header.component';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.css']
})
export class MaestrosComponent implements OnInit {

  lista;
  tipos;
  maestros;
  maestroSeleccionado;
  seleccionTab;

  constructor(private calendarioService: CalendarioService) {
    this.calendarioService.getTiposReunion().subscribe(tiposReunion => {
      this.tipos = tiposReunion;
    })
  }

  ngOnInit() {
  }

  consulta(){
    this.calendarioService.getSeriesDeReunion().subscribe((seriesReunion: any[]) =>{
      for (let i = 0; i < seriesReunion.length; i++) {
        const serie = seriesReunion[i];
        
        if(this.maestroSeleccionado == serie.tipo && serie.nombre == "Maestro"){
          console.log(this.seleccionTab)
          this.lista = eval("serie." + this.seleccionTab);
        }
      }
    })
  }
}

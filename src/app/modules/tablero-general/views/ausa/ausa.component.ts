import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ausa',
  templateUrl: './ausa.component.html',
  styleUrls: ['./ausa.component.css']
})
export class AusaComponent implements OnInit {

  tituloSeleccionado = "";

  type = 'line';
  data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Noviembre", "Diciembre"],
    datasets: [
      {
        label: "2018",
        data: [65, 59, 80, 81, 56, 55, 40, 56, 55, 40, 15]
      },{
        label: "2019",
        data: [23, 44, 55, 12, 36, 72, 21, 23, 44, 55, 45]
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: true
  };

  constructor() { }

  ngOnInit() {
  }

  seleccionChart(titulo){
    this.tituloSeleccionado = titulo;
  }
}

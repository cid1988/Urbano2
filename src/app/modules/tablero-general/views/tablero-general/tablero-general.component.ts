import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tablero-general',
  templateUrl: './tablero-general.component.html',
  styleUrls: ['./tablero-general.component.css']
})
export class TableroGeneralComponent implements OnInit {
  
  areas = [
    {nombre: "Ejemplo 1"},
    {nombre: "Ejemplo 2"},
    {nombre: "Ejemplo 3"},
    {nombre: "Ejemplo 4"},
    {nombre: "Ejemplo 5"},
    {nombre: "Ejemplo 6"}
  ];

  type = 'radar';
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
    maintainAspectRatio: true,
    legend: {
      display: false
    }
  };

  constructor() { }

  ngOnInit() {
  }

}

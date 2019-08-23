import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'proyecto-crear',
  templateUrl: './proyecto-crear.component.html',
  styleUrls: ['./proyecto-crear.component.css']
})
export class ProyectoCrearComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      // console.log(params);
    })
  }

  ngOnInit() {
  }
  
  guardarProyecto(){

  }
}

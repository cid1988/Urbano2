import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardContactoComponent } from './components/card-contacto/card-contacto.component';
import { PortadaComponent } from './views/portada/portada.component';
import { Routes, RouterModule } from '@angular/router';

const contactosRoutes: Routes = [
  {
    path:'contactos',
    component:PortadaComponent
  }
];

@NgModule({
  declarations: [CardContactoComponent, PortadaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(contactosRoutes)
  ],
  exports:[
    CardContactoComponent
  ]
})
export class ContactosModule { }

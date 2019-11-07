import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardContactoComponent } from './components/card-contacto/card-contacto.component';
import { PortadaComponent } from './views/portada/portada.component';
import { Routes, RouterModule } from '@angular/router';
import { EtiquetaCorreoComponent } from './components/etiqueta-correo/etiqueta-correo.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

const contactosRoutes: Routes = [
  {
    path:'contactos',
    component:PortadaComponent
  }
];

@NgModule({
  declarations: [CardContactoComponent, PortadaComponent,EtiquetaCorreoComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(contactosRoutes),
    TooltipModule.forRoot()
  ],
  exports:[
    CardContactoComponent,
    EtiquetaCorreoComponent
  ]
})
export class ContactosModule { }

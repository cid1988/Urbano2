import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaComponent } from './views/portada/portada.component';
import { DetalleComponent } from './views/detalle/detalle.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ReactiveFormsModule } from '@angular/forms';

const organigramaRoutes: Routes = [
  {
    path:'organigrama',
    component:PortadaComponent
  },
  {
    path:'organigrama/:id',
    component:DetalleComponent
  }
];

@NgModule({
  declarations: [PortadaComponent, DetalleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(organigramaRoutes)
  ]
})
export class OrganigramaModule { }

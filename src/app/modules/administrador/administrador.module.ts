import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './views/admin/admin.component';
import { Routes, RouterModule } from '@angular/router';

const poaRoutes: Routes = [
  {path:'administrador',component:AdminComponent}
];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(poaRoutes)
  ]
})
export class AdministradorModule { }

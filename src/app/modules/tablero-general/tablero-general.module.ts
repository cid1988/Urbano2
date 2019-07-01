import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableroGeneralComponent } from './views/tablero-general/tablero-general.component';
import { AusaComponent } from './views/ausa/ausa.component';
import { Routes, RouterModule } from '@angular/router';
import { ChartModule } from 'angular2-chartjs';
import { TransporteComponent } from './views/transporte/transporte.component';
import { PresentacionesComponent } from './views/presentaciones/presentaciones.component';

const tableroGeneralRoutes: Routes = [
  {path:'tablero-general',component:TableroGeneralComponent},
  {path:'tablero-general/ausa',component:AusaComponent},
  {path:'tablero-general/transporte',component:TransporteComponent},
  {path:'tablero-general/presentaciones',component:PresentacionesComponent}
];

@NgModule({
  declarations: [TableroGeneralComponent, AusaComponent, TransporteComponent, PresentacionesComponent],
  imports: [
    CommonModule,
    ChartModule,
    RouterModule.forChild(tableroGeneralRoutes)
  ]
})
export class TableroGeneralModule { }

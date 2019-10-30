import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GuardsGuard } from 'src/app/shared-modules/guards/guards.guard';

const poaRoutes: Routes = [
  {path:'home',component:HomeComponent, canActivate:[GuardsGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(poaRoutes)
  ]
})
export class HomeModule { }

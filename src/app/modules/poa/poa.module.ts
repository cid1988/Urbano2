import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlanCrearComponent } from './components/planes/plan-crear/plan-crear.component';
import { ProyectosPorPlanComponent } from './components/proyectos/proyectos-por-plan/proyectos-por-plan.component';
import { ActividadesPorProyectoComponent } from './components/actividades/actividades-por-proyecto/actividades-por-proyecto.component';
import { ProyectosComponent } from './views/proyectos/proyectos.component';
import { ActividadesComponent } from './views/actividades/actividades.component';
import { FormsModule } from '@angular/forms';
import { ActividadDetalleComponent } from './components/actividades/actividad-detalle/actividad-detalle.component';
import { OrderByPipe } from 'src/app/shared-modules/pipes/orderBy/order-by.pipe';
import { FilterPipe } from 'src/app/shared-modules/pipes/filter/filter.pipe';
import { ReversePipe } from 'src/app/shared-modules/pipes/reverse/reverse.pipe';

const poaRoutes: Routes = [
  {path:'poa',component:ProyectosComponent},
  {path:'poa/proyecto/:idProyecto',component:ActividadesComponent},
  {path:'poa/plan/crear',component:PlanCrearComponent},
  // {path:'poa/proyecto/:idProyecto/etapa/:idEtapa/actividad/:idActividad',component:ActividadDetalleComponent},
  {path:'poa/proyecto/:idProyecto/actividad/:idActividad',component:ActividadDetalleComponent}
];

@NgModule({
  declarations: [OrderByPipe, FilterPipe, ReversePipe, PlanCrearComponent, ProyectosPorPlanComponent, ActividadesPorProyectoComponent, ProyectosComponent, ActividadesComponent, ActividadDetalleComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(poaRoutes)
  ],
  exports: [RouterModule]
})
export class PoaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlanCrearComponent } from './components/planes/plan-crear/plan-crear.component';
import { ProyectoCrearComponent } from './components/proyectos/proyecto-crear/proyecto-crear.component';
import { ProyectosPorPlanComponent } from './components/proyectos/proyectos-por-plan/proyectos-por-plan.component';
import { ActividadesPorProyectoComponent } from './components/actividades/actividades-por-proyecto/actividades-por-proyecto.component';
import { ProyectosComponent } from './views/proyectos/proyectos.component';
import { ActividadesComponent } from './views/actividades/actividades.component';
import { FormsModule } from '@angular/forms';
import { EtapasPorProyectoComponent } from './components/proyectos/etapas-por-proyecto/etapas-por-proyecto.component';
import { ActividadDetalleComponent } from './components/actividades/actividad-detalle/actividad-detalle.component';
import { OrderByPipe } from 'src/app/shared-modules/pipes/orderBy/order-by.pipe';
import { FilterPipe } from 'src/app/shared-modules/pipes/filter/filter.pipe';

const poaRoutes: Routes = [
  {path:'poa',component:ProyectosComponent},
  {path:'poa/:idProyecto',component:ActividadesComponent},
  {path:'poa/proyecto/crear',component:ProyectoCrearComponent},
  {path:'poa/plan/crear',component:PlanCrearComponent},
  {path:'poa/:idProyecto/:idActividad',component:ActividadDetalleComponent}
];

@NgModule({
  declarations: [OrderByPipe, FilterPipe, PlanCrearComponent, ProyectoCrearComponent, ProyectosPorPlanComponent, ActividadesPorProyectoComponent, ProyectosComponent, ActividadesComponent, EtapasPorProyectoComponent, ActividadDetalleComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(poaRoutes)
  ],
  exports: [RouterModule]
})
export class PoaModule { }

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Calendar } from '@fullcalendar/core';
import { CalendarioViewComponent } from './views/calendario/calendario.component';

const rdgRoutes: Routes = [
  {path:'calendario',component:CalendarioComponent}
];

@NgModule({
  declarations: [CalendarioComponent,CalendarioViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(rdgRoutes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [RouterModule]
})
export class RdgModule { }

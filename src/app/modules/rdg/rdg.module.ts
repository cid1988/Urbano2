import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import {CalendarComponent} from "ap-angular2-fullcalendar/src/calendar/calendar";
import { Calendar } from '@fullcalendar/core';

const rdgRoutes: Routes = [
  {path:'calendario',component:CalendarioComponent},
];

@NgModule({
  declarations: [CalendarioComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(rdgRoutes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  exports: [RouterModule]
})
export class RdgModule { }

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CalendarioViewComponent } from './views/calendario/calendario.component';
import { GroupByPipe } from 'src/app/shared-modules/pipes/group-by.pipe';

const rdgRoutes: Routes = [
  {path:'calendario',component:CalendarioComponent}
];

@NgModule({
  declarations: [CalendarioComponent,CalendarioViewComponent,GroupByPipe],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(rdgRoutes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [RouterModule]
})
export class RdgModule { }

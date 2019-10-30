import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CalendarioViewComponent } from './views/calendario/calendario.component';
import { GroupByPipe } from 'src/app/shared-modules/pipes/groupBy/group-by.pipe';
import { MaestrosComponent } from './views/maestros/maestros.component';
import { MailHeaderComponent } from './components/mail-header/mail-header.component';
import { ContactosModule } from '../contactos/contactos.module';


const rdgRoutes: Routes = [
  {path:'calendario',component:CalendarioComponent},
  {path:'calendario/maestros',component:MaestrosComponent}
];

@NgModule({
  declarations: [CalendarioComponent, CalendarioViewComponent,
    GroupByPipe, MaestrosComponent, MailHeaderComponent,],
  imports: [
    CommonModule,
    FormsModule,
    ContactosModule,
    RouterModule.forChild(rdgRoutes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [RouterModule]
})
export class RdgModule { }

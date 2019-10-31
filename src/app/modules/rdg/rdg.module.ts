import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CalendarioViewComponent } from './views/calendario/calendario.component';
import { GroupByPipe } from 'src/app/shared-modules/pipes/groupBy/group-by.pipe';
import { MaestrosComponent } from './views/maestros/maestros.component';
import { MailHeaderComponent } from '../../shared-modules/mail/mail-header/mail-header.component';
import { ContactosModule } from '../contactos/contactos.module';
import { ModalCrearReunionComponent } from './components/modals/modal-crear-reunion/modal-crear-reunion.component';
import { ModalDetalleReunionComponent } from './components/modals/modal-detalle-reunion/modal-detalle-reunion.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

const rdgRoutes: Routes = [
  {path:'calendario',component:CalendarioComponent},
  {path:'calendario/maestros',component:MaestrosComponent}
];

@NgModule({
  declarations: [CalendarioComponent, CalendarioViewComponent, GroupByPipe,
    MaestrosComponent, MailHeaderComponent, ModalCrearReunionComponent, ModalDetalleReunionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ContactosModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule.forChild(rdgRoutes)
  ],
  entryComponents: [ModalCrearReunionComponent, ModalDetalleReunionComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [RouterModule]
})
export class RdgModule { }

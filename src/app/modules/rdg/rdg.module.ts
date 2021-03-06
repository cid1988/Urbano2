import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CalendarioViewComponent } from './views/calendario/calendario.component';
import { GroupByPipe } from 'src/app/shared-modules/pipes/groupBy/group-by.pipe';
import { MaestrosComponent } from './views/maestros/maestros.component';
import { ContactosModule } from '../contactos/contactos.module';
import { ModalCrearReunionComponent } from './components/modals/modal-crear-reunion/modal-crear-reunion.component';
import { ModalDetalleReunionComponent } from './components/modals/modal-detalle-reunion/modal-detalle-reunion.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CitasComponent } from './views/citas/citas.component';
import { MailModule } from 'src/app/shared-modules/mail/mail.module';
import { MinutasComponent } from './views/minutas/minutas.component';
import { CompromisosComponent } from './components/compromisos/compromisos.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ModalCompromisoComponent } from './components/modals/modal-compromiso/modal-compromiso.component';
import { TemarioComponent } from './views/temario/temario.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

const rdgRoutes: Routes = [
  {path:'rdg/cita/:id',component:CitasComponent},
  {path:'rdg/temario/:id',component:TemarioComponent},
  {path:'rdg/minuta/:id',component:MinutasComponent},
  {path:'rdg/calendario',component:CalendarioComponent}, 
  {path:'rdg/maestros',component:MaestrosComponent}
];

@NgModule({
  declarations: [CalendarioComponent, CalendarioViewComponent, GroupByPipe, MaestrosComponent, ModalCrearReunionComponent, ModalDetalleReunionComponent, CitasComponent, MinutasComponent, CompromisosComponent, ModalCompromisoComponent, TemarioComponent],
  imports: [
    CommonModule,
    FormsModule,
    ContactosModule,
    MailModule,
    EditorModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(rdgRoutes) 
  ],
  entryComponents: [ModalCrearReunionComponent, ModalDetalleReunionComponent, ModalCompromisoComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [RouterModule]
})
export class RdgModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailBodyComponent } from './mail-body/mail-body.component';
import { MailHeaderComponent } from './mail-header/mail-header.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ContactosModule } from 'src/app/modules/contactos/contactos.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ MailBodyComponent,MailHeaderComponent],
  imports: [
    CommonModule,
    EditorModule,
    ContactosModule,
    FormsModule
  ],
  exports:[MailBodyComponent,MailHeaderComponent]
})
export class MailModule { }

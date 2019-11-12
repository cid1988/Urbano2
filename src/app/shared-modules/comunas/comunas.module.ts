import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunasListaBadgeComponent } from './components/comunas-lista-badge/comunas-lista-badge.component';

@NgModule({
  declarations: [ComunasListaBadgeComponent],
  imports: [
    CommonModule
  ],
  exports: [ComunasListaBadgeComponent]
})
export class ComunasModule { }

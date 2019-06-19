import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoaModule } from './modules/poa/poa.module';
import { NavbarComponent } from './shared-modules/navbar/components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RdgModule } from './modules/rdg/rdg.module';
import * as $ from 'jquery'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoaModule,
    RdgModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

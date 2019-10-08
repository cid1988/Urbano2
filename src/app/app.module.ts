import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoaModule } from './modules/poa/poa.module';
import { NavbarComponent } from './shared-modules/navbar/components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RdgModule } from './modules/rdg/rdg.module';
import { TableroGeneralModule } from './modules/tablero-general/tablero-general.module';
import { AdministradorModule } from './modules/administrador/administrador.module';
import { HomeComponent } from './modules/home/components/home/home.component';
import { HomeModule } from './modules/home/home.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { OrganigramaModule } from './modules/organigrama/organigrama.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoaModule,
    RdgModule,
    TableroGeneralModule,
    AdministradorModule,
    HttpClientModule,
    HomeModule,
    OrganigramaModule,
    NgxPermissionsModule.forRoot()
  ],
  // providers: [{provide: LOCALE_ID, useValue: "en-es"}],//Para usar la fecha en formato espanol
  exports: [NgxPermissionsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

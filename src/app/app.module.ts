import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
    NgxPermissionsModule.forRoot()
  ],
  exports: [NgxPermissionsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './views/admin/admin.component';
import { Routes, RouterModule } from '@angular/router';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { FormsModule } from '@angular/forms';
import { NgxPermissionsGuard } from 'ngx-permissions';

const poaRoutes: Routes = [
  {path:'administrador',component:AdminComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'ADMINISTRADOR',
        // except: ['GUEST']
        //redirectTo: Pantalla de no acceso
      }
    },
  }
];

@NgModule({
  declarations: [AdminComponent, CrearUsuarioComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(poaRoutes)
  ]
})
export class AdministradorModule { }

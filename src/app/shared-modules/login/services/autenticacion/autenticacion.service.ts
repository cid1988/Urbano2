import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { UserService } from '../../../../modules/administrador/services/user/user.service'
import { Login } from '../../models/login';
import { HttpClient } from '@angular/common/http';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  baseUrl = environment.baseUrl;
  public logeado= false;
  public usuarioLogeado:Login;
  public logIn= new Subject();
 
  constructor(
    private http: HttpClient, 
    private permissionsService: NgxPermissionsService,  
    private roleStore: NgxRolesService, 
    private userService: UserService) {
      if(this.estaLogeado()){
        this.userService.getUserPermissions(this.getUsuarioLogeado()).subscribe((permisos: any) =>{
          this.permissionsService.loadPermissions(permisos.permissions);
        });
        this.roleStore.addRoles({
          'MINISTRO': ['tablerogeneral', 'tablerogeneral.db', 'tablerogeneral.fm'],
          'DIRECTOR GENERAL': [],
          'AGENTE INTERNO': [],
          'AGENTE EXTERNO': [],
          'RDG': ['rdg', 'rdg.db'],
          'POA': ["poa","poa.db"],
          'ADMINISTRADOR': ['admin.db', 'admin.users'],
          'DESARROLLADOR': [],
          'GUEST': () => {
            // return this.roleStore.checkSessions().toPromise();
          }
        })
      }
  }

  estaLogeado(){
    if(localStorage.getItem('usuario') && localStorage.getItem('token')){
      return true
    } else false
  }

  setUsuarioLogeado(usuario:Login){
    this.logeado = true;
    this.usuarioLogeado = usuario;
    localStorage.setItem('usuario', usuario.username);
    localStorage.setItem('token', usuario.token);
  }

  getUsuarioLogeado(){
    return localStorage.getItem('usuario')
  }
  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
    this.logeado = false;
    localStorage.clear();
  }
}

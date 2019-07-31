import { Injectable, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { CryptoJS } from "crypto-js";
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  public isUserLoggedIn;
  public userLogged:User;
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient, private permissionsService: NgxPermissionsService, private roleStore: NgxRolesService) {
    this.isUserLoggedIn = false;
    
    this.getUserPermissions('pperello').subscribe((permisos: any) =>{
      this.permissionsService.loadPermissions(permisos[0].permissions);
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
    });
  }

  setUserLoggedIn(user:User) {
    this.isUserLoggedIn = true;
    this.userLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.fireIsLoggedIn.emit(user);
  }

  getUsers():Observable<[]>{
    return this.http.get<[]>(this.baseUrl + '/users');
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  crearUsuario(usuario):Observable<{}>{
    // var a = CryptoJS.HmacSHA1(usuario.password, 'BAGestion%1234'); 
    var a = CryptoJS.AES.encrypt(JSON.stringify(usuario.password), 'BAGestion%1234');
    usuario.password = a.toString(CryptoJS.enc.Utf8)
    return this.http.post<{}>(this.baseUrl + '/users/crear/', usuario)
  }

  getUserPermissions(username):Observable<{}>{
    let user = {username: username};
    return this.http.post<{}>(this.baseUrl + '/users/permisos/', user);
  }

  logout(){
    this.isUserLoggedIn = false;
    this.fireIsLoggedIn.emit("");
    localStorage.clear();
  }

  getEmitter() {
    return this.fireIsLoggedIn;
  }
}

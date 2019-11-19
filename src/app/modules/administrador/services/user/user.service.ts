import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import * as CryptoJS from "crypto-js"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers():Observable<[]>{
    return this.http.get<[]>(this.baseUrl + '/users');
  }
  
  getJurisdiccionPOA(){
    return localStorage.getItem('jurisdiccionPOA')
  }

  crearUsuario(usuario):Observable<{}>{
    // var a = CryptoJS.HmacSHA1(usuario.password, 'BAGestion%1234'); 
    var a = CryptoJS.AES.encrypt(JSON.stringify(usuario.password), 'BAGestion%1234');
    usuario.password = a.toString(CryptoJS.enc.Utf8)
    return this.http.post<{}>(this.baseUrl + '/users', usuario)
  }

  getUserPermissions(username):Observable<{}>{
    let user = {username: username};
    return this.http.post<{}>(this.baseUrl + '/users/permisos/', user);
  }

}

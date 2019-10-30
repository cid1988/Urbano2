import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import * as CryptoJS from "crypto-js"
import { User } from '../../../../modules/administrador/models/user';
import { AutenticacionService } from '../autenticacion/autenticacion.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private autenticacion: AutenticacionService) { } 

  login(login:User){
    var data=CryptoJS.AES.encrypt(login.password, 'BAGestion%1234')
    login.password=data.toString();
    return this.http.post(this.baseUrl + '/login', login,
    {
      headers: new HttpHeaders().set("Authorization","Bearer "+ this.autenticacion.getToken())
    });     
  }
}

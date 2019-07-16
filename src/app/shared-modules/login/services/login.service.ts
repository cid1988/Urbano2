import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  login(username:string, password:string) {
    return this.http.post(this.baseUrl + '/users', {
      username: username,
      password: password,     
    });     
  }
}

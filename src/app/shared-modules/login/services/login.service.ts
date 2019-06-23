import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username:string, password:string) {
    console.log(username)
    return this.http.post('http://localhost:3000/api/users', {
      username: username,
      password: password,     
    });     
  }
}

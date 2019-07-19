import { Injectable, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  public isUserLoggedIn;
  public userLogged:User;
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) {
  	this.isUserLoggedIn = false;
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

  logout(){
    this.fireIsLoggedIn.emit("");
    localStorage.clear();
  }

  getEmitter() {
    return this.fireIsLoggedIn;
  }
}

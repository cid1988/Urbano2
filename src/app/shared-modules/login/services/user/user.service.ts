import { Injectable, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isUserLoggedIn;
  public userLogged:User;
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  	this.isUserLoggedIn = false;
  }

  setUserLoggedIn(user:User) {
    this.isUserLoggedIn = true;
    this.userLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.fireIsLoggedIn.emit(user);
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

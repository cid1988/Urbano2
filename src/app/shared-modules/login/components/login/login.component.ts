import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogged;

  constructor(private router: Router, private userService: UserService, private loginService: LoginService) {}

  ngOnInit() {
    
  }

  logIn(username: string, password: string, event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form

    this.loginService.login(username, password).subscribe((res: User) => {
      if(res){
        let u: User = {username: res.username, password: "", jurisdiccion: res.jurisdiccion};//No deberia tener la password pero sino tira error
        this.userService.setUserLoggedIn(u);
        this.navigate();
      }else{
        alert("Usuario incorrecto");
      }
    },
    error => {
      alert("Error: " + error);
      console.error(error);
    });
  }

  navigate() {
    this.router.navigateByUrl('/home');
  }
}

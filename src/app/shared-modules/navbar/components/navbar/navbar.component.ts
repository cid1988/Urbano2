import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared-modules/login/services/user/user.service';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLogged;

  constructor(private router: Router, private userService: UserService) {
    this.userLogged = this.userService.getUserLoggedIn();
  }

  ngOnInit() {
    if(this.userService.isUserLoggedIn){
      this.setUserLogged();
    }else{
      this.userService.getEmitter().subscribe((customObject) => {
        this.userLogged = customObject;
      });
    }
  }

  setUserLogged(){
    this.userLogged = this.userService.getUserLoggedIn();
  }

  logout(){
    this.userService.logout();
    this.setUserLogged();
    this.router.navigateByUrl('/login');
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared-modules/login/services/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((users: any[]) =>{
      this.users = users;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared-modules/login/services/user/user.service';
import { OrganigramaService } from 'src/app/modules/organigrama/services/organigrama.service';
import { User } from 'src/app/shared-modules/login/models/user';

declare var $:any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users = [];
  nuevoUsuario: User;
  jurisdicciones =[];

  constructor(private userService: UserService, private organigramaService: OrganigramaService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((users: any[]) =>{
      this.users = users;
    });
    this.organigramaService.getOrganigrama().subscribe(organigrama =>{
      this.jurisdicciones = organigrama;
    })
  }

  crearUsuario(confirmado){
    // this.userService.getUserPermissions('pperello').subscribe((permisos:any) =>{
    //   console.log(permisos.permissions);
    // })
    if(confirmado){
      this.userService.crearUsuario(this.nuevoUsuario).subscribe(data =>{
        console.log(data);
      })
    }else{
      $('#crearUsuarioModal').modal('show');
    }
  }

  detalleContacto(u){
    this.nuevoUsuario = u;
    console.log(u)
    $('#crearUsuarioModal').modal('show');
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/shared-modules/login/services/autenticacion/autenticacion.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  logeado:boolean;
  usuario;

  constructor(private router: Router, private autenticacion: AutenticacionService) {
  }

  ngOnInit() {
    this.autenticacion.logIn.subscribe((data: any)=>{
      this.logeado=data.logeado;
      this.usuario=data.usuario;
    })
    if(this.autenticacion.estaLogeado()){
      this.logeado= true;
      this.usuario = this.autenticacion.getUsuarioLogeado()
    }else this.logeado= false;
  }
  


  logout(){
    this.autenticacion.logout();
    this.logeado=false
    this.usuario = ''
    this.router.navigateByUrl('/login')
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error:String ='';
  submitted:boolean
  datosLogin: FormGroup;
  usuarioLogeado=false;
  @Output() public logeado=new EventEmitter<boolean>();

  constructor(private router: Router,
    private autenticacion: AutenticacionService,
    private loginService: LoginService,
    private fb: FormBuilder) {}

    

  ngOnInit() {
    if(this.autenticacion.estaLogeado()){
      this.router.navigateByUrl('/home')
    }else{
      this.submitted=false
      this.datosLogin=this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
    }
  }

  get f() { return this.datosLogin.controls; }

  logIn() {
    this.error=''
    this.submitted = true;
    if (this.datosLogin.invalid) {
      return; 
    }

    this.loginService.login(this.datosLogin.value).subscribe((login:Login)=> {
      this.autenticacion.logIn.next({usuario: login.username, logeado:true})
      this.autenticacion.setUsuarioLogeado(login);
      this.navigate();
    },
    error => {
      this.error=error.error;
    }); 
  }

  navigate() {
    this.router.navigateByUrl('/home').then(function(){
      
    })
  }
}

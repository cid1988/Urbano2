import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/modules/administrador/services/user/user.service';import { AutenticacionService } from '../login/services/autenticacion/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private userService:UserService, private router: Router ,private autenticacion: AutenticacionService){}

  isAdmin(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.autenticacion.estaLogeado()) {
      console.log('No estás logueado');
      this.router.navigate(['/']);
      return false;
    }else{
      console.log("Bienvenido")
      return true;
    }
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.autenticacion.estaLogeado()) {
      console.log('No estás logueado');
      this.router.navigate(['/login']);
      return false;
    }else return true
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}

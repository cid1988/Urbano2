import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../login/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private userService:UserService, private router: Router){}

  isAdmin(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.userService.isUserLoggedIn) {
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

    if (!this.userService.isUserLoggedIn) {
      console.log('No estás logueado');
      this.router.navigate(['/']);
      return false;
    }else{
      console.log("Bienvenido")
      return true;
    }
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

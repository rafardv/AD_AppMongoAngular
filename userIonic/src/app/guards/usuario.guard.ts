import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate, CanLoad
{
  constructor(private userService: UserService) {
  }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean> | boolean{
    return this.userService.validaToken();
  }

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean> | boolean
  {
    return this.userService.validaToken();
  }
}

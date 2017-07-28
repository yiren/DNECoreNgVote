import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthGuardService implements CanActivate {
  
  constructor(private authService:AuthService,
              private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let url=state.url;
    if(this.authService.isLoggedIn){
      return true
    }
    this.authService.redirectUrl=url;
    this.router.navigate(['/login']);
    return false;
  }

}

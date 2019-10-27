import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(private loginService: LoginService, private router: Router) {}
  canLoad(
    route: Route, 
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> | boolean {
    if(!this.loginService.userIsLoggedIn){
      this.router.navigateByUrl('/login');
    }
    return this.loginService.userIsLoggedIn;
  }

}

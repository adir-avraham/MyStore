import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { map, take } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode'; 
import { Decoded } from '../services/auth/auth.interfaces';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(take(1),
      map(user => {
        const decoded: Decoded = jwtDecode(user.token);  
        const { role } = decoded._doc;
        if (role === 'user') {
          return true;
        }
        return this.router.createUrlTree(['/home']);
      })
    )
  }
  
};
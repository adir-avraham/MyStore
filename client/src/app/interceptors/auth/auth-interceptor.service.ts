import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler ) {
    if (req.url.includes('https://api.shutterstock.com')) return next.handle(req);

    return this.authService.user.pipe(take(1), 
      exhaustMap(user =>{
        if (!user) {
          return next.handle(req);
        }
        const authReq = req.clone({
          setHeaders: { Authorization: user.token }
        })
        return next.handle(authReq);
      })
    )

  };

};
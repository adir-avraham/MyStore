import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode'; 
import { baseUrl } from 'src/app/sharing-url/sharing.url';
import { UserData, Decoded, ResLogin, newUser } from './auth.interfaces';


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  public registerFirstStepUrl = `${baseUrl}/register/firstStep`;
  public registerUrl = `${baseUrl}/register/secondStep`;
  public loginUrl = `${baseUrl}/login`;

  public user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) { }

  autoLogin() {
    const userData: UserData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
  
    const { firstName, _token, _tokenExpirationDate } = userData;
    const loadedUser = new User(firstName, _token, new Date(_tokenExpirationDate)); 
    
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const decoded: Decoded = jwtDecode(loadedUser.token);       
      const { exp } = decoded;
      const expirationTime = exp * 1000; 
      const expirationDuration = expirationTime - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  };


  login(userName: string, password: string) {
    return this.httpClient.post(this.loginUrl, {userName, password}).pipe(tap((resLogin: ResLogin)=>{
      const { status } = resLogin;
      if (status) {
        const { firstName, token } = resLogin.userData;
        const decoded: Decoded = jwtDecode(token);
        const { iat, exp } = decoded;
        const expirationTime = (exp - iat) * 1000; 
        const expirationDate = new Date(new Date().getTime() + expirationTime);
        const user = new User(firstName, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expirationTime);
        localStorage.setItem('userData', JSON.stringify(user));
      }    
    })).pipe(catchError(error => {
      return throwError(error)
    }))
  };


  resiterFirstStep(userName: string) {
    return this.httpClient.get(`${this.registerFirstStepUrl}/${userName}`);
  };


  register(newUser: newUser) {
    return this.httpClient.post(this.registerUrl, newUser);
  };

  
  logout() {
    this.user.next(null);
    this.router.navigate(['/home']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  };

  
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() =>{
      this.logout();
    }, expirationDuration)
  };

};
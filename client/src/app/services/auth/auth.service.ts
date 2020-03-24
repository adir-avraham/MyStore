import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode'; 
import { basedUrl } from 'src/app/sharing-url/sharing.url';


interface newUser {
  id: number;
  userName: string;
  password: string;
  passwordConfirm: string;
  city?: string;
  street?: string;
  firstName?: string;
  lastName?: string; 
}

interface ResLogin {
  userData: any,
  status: boolean
}

interface UserData {
  firstName: string;
  role: string;
  _token: string;
  _tokenExpirationDate: string;
}

interface Decoded {
  exp: any;
  iat: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public registerFirstStepUrl = `${basedUrl}/register/firstStep`;
  public registerUrl = `${basedUrl}/register/secondStep`;
  public loginUrl = `${basedUrl}/login`;

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) { }

  
  autoLogin() {
    const userData: UserData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const { firstName, role, _token, _tokenExpirationDate } = userData;
    const loadedUser = new User(firstName, role, _token, new Date(_tokenExpirationDate)); 
    
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const decoded: Decoded = jwtDecode(loadedUser.token);        
      const { exp } = decoded;
      const expirationTime = exp * 1000; 
      const expirationDuration = expirationTime - new Date().getTime();
      console.log({expirationDuration})
      this.autoLogout(expirationDuration);
    }
  }


  login(userName: string, password: string) {
    return this.httpClient.post(this.loginUrl, {userName, password}).pipe(tap((resLogin: ResLogin)=>{
      const { status } = resLogin;
      if (status) {
        const { firstName, role, token } = resLogin.userData;
        const decoded: Decoded = jwtDecode(token);
        const { iat, exp } = decoded;
        const expirationTime = (exp - iat) * 1000; 
        const expirationDate = new Date(new Date().getTime() + expirationTime);
        const user = new User(firstName, role, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expirationTime)
        localStorage.setItem('userData', JSON.stringify(user));
      }
      
    })).pipe(catchError(error => {
      return throwError(error)
    }));
  }

  resiterFirstStep(newUser: newUser) {
    return this.httpClient.post(this.registerFirstStepUrl, newUser);
  }

  register(newUser: newUser) {
    return this.httpClient.post(this.registerUrl, newUser);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/home']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() =>{
      this.logout();
    }, expirationDuration)
  }

};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

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

// interface User {
//   _id: string;
//   firstName: string;
//   role: string;
//   token: string;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public registerFirstStepUrl = "http://localhost:4000/register/firstStep";
  public registerUrl = "http://localhost:4000/register/secondStep";
  public loginUrl = "http://localhost:4000/login";

  user = new Subject<User>();

  constructor(private httpClient: HttpClient) { }

  login(userName: string, password: string) {
    return this.httpClient.post(this.loginUrl, {userName, password}).pipe(tap((resLogin: ResLogin)=>{
      const { status }  = resLogin;
      if (status) {
        const { firstName, role, _id, token } = resLogin.userData
        const expirationDate = new Date(new Date().getTime() + 600000)
        const user = new User(firstName, role, _id, token, expirationDate);
        this.user.next(user);
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

}
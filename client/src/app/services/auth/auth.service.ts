import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public registerFirstStepUrl = "http://localhost:4000/register/firstStep";
  public registerUrl = "http://localhost:4000/register/secondStep";
  public loginUrl = "http://localhost:4000/login";

  constructor(private httpClient: HttpClient) { }

  login(userName: string, password: string) {
    return this.httpClient.post(this.loginUrl, {userName, password});
  }

  resiterFirstStep(newUser: newUser) {
    return this.httpClient.post(this.registerFirstStepUrl, newUser);
  }

  register(newUser: newUser) {
    return this.httpClient.post(this.registerUrl, newUser);
  }

}
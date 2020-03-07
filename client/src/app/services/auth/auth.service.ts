import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginUrl = "http://localhost:4000/login";

  constructor(private httpClient: HttpClient) { }

  login(userName: string, password: string) {
    return this.httpClient.post(this.loginUrl, {userName, password})
  }

}

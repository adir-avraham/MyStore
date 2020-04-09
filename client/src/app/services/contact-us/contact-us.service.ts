import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/app/sharing-url/sharing.url';

export interface Mail {
  name: string;
  email: string;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  public contactUrl = `${baseUrl}/contact`

  constructor(private httpClient: HttpClient) { }

  sendEmail(mail: Mail) {
    return this.httpClient.post(this.contactUrl, mail);
  }


};
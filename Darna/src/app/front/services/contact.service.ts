import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { host } from 'src/app/host';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }
  sendEmail(data) {
    return this.http.post(host + '/api/contact', data);
  }
 
}

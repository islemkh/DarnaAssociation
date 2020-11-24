import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { host } from 'src/app/host';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) { }
  postdemand(data) {
    return this.http.post(host + '/api/register', data);
  }
  isLoggedIn() {
    let token = sessionStorage.getItem('token');
    console.log(token);
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}

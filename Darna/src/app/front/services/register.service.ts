import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpRequest} from '@angular/common/http';
const host = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }


  postdemand(data) {

     return this.http.post(host +'/api/register',data);
  }
  isLoggedIn()
  {
  let token= sessionStorage.getItem('token')
  console.log(token)
  if(token){
    return true;
  }else{
    return false;
  }
}
}

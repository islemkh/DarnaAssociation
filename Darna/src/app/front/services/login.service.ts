import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  jwt: string;
  username: string;
  role;
  private host = 'http://localhost:8080';
  constructor(private http: HttpClient ,private router:Router) { }

  login(data)
  {
    return this.http.post(this.host + '/api/login'
      , data, {observe: 'response'});
  }

saveToken(jwt: string ,role:string) {
  sessionStorage.setItem('token', jwt);
  sessionStorage.setItem('role', role);
  this.jwt = jwt;
  this.role = role;
 // console.log( this.jwt)

}
loadToken()
{
  this.jwt = sessionStorage.getItem('token');

}
initParams()
{
  this.jwt = undefined;
  this.role = undefined;
}

isLoggedIn()
{
let token= sessionStorage.getItem('token')
if(token){
  return true;
}else{
  return false;
}
}
logout(): void {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("role");
  this.router.navigate(['/login']);
}
}

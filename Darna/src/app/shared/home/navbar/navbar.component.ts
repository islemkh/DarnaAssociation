import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../front/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role;
  isLoggedIn : Boolean ;
  constructor(private loginservice: LoginService,  private router: Router) { }

  ngOnInit(): void {
this.role= sessionStorage.getItem('role')
    this.isLoggedIn= this.loginservice.isLoggedIn();
  }
   logout(){
    this.loginservice.logout();

  }
 /*  logout(){
    sessionStorage.removeItem("token");
    this.router.navigate(['/login']);

  } */


}

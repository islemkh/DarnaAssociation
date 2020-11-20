import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../front/services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  constructor(private loginservice: LoginService, private router: Router) { }
role;
  ngOnInit(): void {
    let isLoggedIn= this.loginservice.isLoggedIn();
    this.role= sessionStorage.getItem('role')
    if (isLoggedIn && this.role==='admin') {
      this.router.navigate(['/listeDemandes']);
    }else if (isLoggedIn && this.role==='member'){
      this.router.navigate(['/']);
    }
  }


}

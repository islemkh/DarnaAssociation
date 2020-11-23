import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  role;
  connectedUser;
  token: string;
  jwt: string;
  statut: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginservice: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Email: [''],
      Password: [''],
    });
    // let isLoggedIn= this.loginservice.isLoggedIn();

    // if (isLoggedIn) {
    //   this.router.navigate(['/listeDemandes']);
    // }

  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    this.router.navigate(['/']);
    console.log(this.loginForm.value);
  }
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginservice.login(this.loginForm.value).subscribe((res: any) => {
      console.log(res);
      console.log(res.body.code);

      if (res.body.code == 204) {
        Swal.fire({
          icon: 'error',
          title: 'oops...',
          text: 'nom utilisateur ou mot de passe incorrecte !',
        });
      } else {
        this.token = res.body.token;
        console.log(this.token);
        this.role = res.body.user.role;
        console.log(this.role);
        this.loginservice.saveToken(this.token, this.role);
        this.statut = res.body.user.statut;
        if (this.statut === 'banni') {
          Swal.fire({
            icon: 'error',
            title: 'oops...',
            text: 'user banni',
          });
          this.router.navigate['/login'];
        } else {
          if (this.role === 'admin') {
            this.router.navigate(['/listeDemandes']);
          }
          if (this.role === 'member') {
            this.router.navigate(['/']);
            this.connectedUser=res.body.user.Email;
            sessionStorage.setItem('UserConnect', this.connectedUser);
            console.log("hello member , you're connected");
          }
        }
      }
    });
  }
}

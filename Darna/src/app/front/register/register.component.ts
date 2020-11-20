import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators,ValidatorFn, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {RegisterService} from '../services/register.service';
import {ImageService} from '../services/image.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  InscriptionForm : FormGroup ;
  submitted = false;
  photo;
  filesToUpload: Array<File>;

  constructor(private formBuilder: FormBuilder , private router: Router , private registerservice: RegisterService, private imageservice: ImageService) {
  /*   let isLoggedIn= this.registerservice.isLoggedIn();
    console.log('isLoggedIn: ', isLoggedIn);

    if (isLoggedIn) {
      this.router.navigate(['/listeDemandes']);
    }  */
   }

  ngOnInit(): void {
    this.InscriptionForm= this.formBuilder.group({
      NomPrenom:[null,Validators.required],
      Email:[null, [Validators.required, Validators.email]],
      Tel:[null,[Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.minLength(8)]],
      DateNaissance:[null,Validators.required],
      Job:[null,Validators.required],
      Password:[null,[Validators.required, Validators.minLength(6)]],
      ConfirmPassword:[null,Validators.required]
    },{
      validator: this.MustMatch('Password', 'ConfirmPassword')
    })

  
  }
  get f() {
    return this.InscriptionForm.controls;
  }
  recuperFile(file){
    this.filesToUpload = (file.target.files as Array<File>);
    this.photo = file.target.files[0].photo;
  }
  Inscrit(){
    const data = {
      NomPrenom: this.InscriptionForm.value.NomPrenom,
      Email: this.InscriptionForm.value.Email,
      Tel: this.InscriptionForm.value.Tel,
      DateNaissance: this.InscriptionForm.value.DateNaissance,
      Job: this.InscriptionForm.value.Job,
      Password: this.InscriptionForm.value.Password,
      ConfirmPassword: this.InscriptionForm.value.ConfirmPassword,
      photo: this.filesToUpload[0].name
      
    };
    console.log('photo: ', this.photo);
    this.submitted = true;

    // stop here if form is invalid
    if (this.InscriptionForm.invalid) {
      return;
    }

    
    console.log(this.InscriptionForm.value);
    this.registerservice.postdemand(data).subscribe(res => {
      console.log(res);
      this.imageservice.pushFileToStorage(this.filesToUpload[0]).subscribe(rest => {
        console.log(rest);
      });
         if (res["code"]==505){
          this.router.navigate(['/register']);
          Swal.fire({
            icon: 'error',
            title: 'oops...',
            text: 'Cet Email existe déja !'
          });
         
        }else{
          this.router.navigate(['/login']);
          Swal.fire(
            'Votre demande a été envoyée avec succés!',
            '',
            'success'
          );
        }
  });
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

}

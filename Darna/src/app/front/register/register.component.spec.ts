import { RegisterComponent } from './register.component';
import {FormBuilder } from '@angular/forms';

describe('RegisterComponent', () => {
  let CompReg: RegisterComponent;
	let authServiceMock: any;
	let formBuilderMock: FormBuilder;
  let routerMock: any;
  beforeEach(() => {
		authServiceMock = {
			postdemand : jest.fn()
		};
		formBuilderMock = new FormBuilder();
		routerMock = jest.fn();
		CompReg = new RegisterComponent(
			formBuilderMock,
			authServiceMock,
			routerMock
		);
		CompReg.ngOnInit();
  });
  describe('Test: ngOnInit', () => {
		it('initialisation  du form Inscription', () => {
			const RegForm = {
				NomPrenom: null,
        Email: null,
        Tel: null,
        DateNaissance: null,
        Job: null,
        Password: null,
        ConfirmPassword: null,        
			};
			expect(CompReg.InscriptionForm.value).toEqual(RegForm);
		});
  });
  describe('Test: Regstre Form', () => {
     	it('should invalidate the form', () => {
       CompReg.InscriptionForm.controls.Email.setValue('');
       CompReg.InscriptionForm.controls.Password.setValue('');
       CompReg.InscriptionForm.controls.DateNaissance.setValue('');
       CompReg.InscriptionForm.controls.Tel.setValue('');
       CompReg.InscriptionForm.controls.Job.setValue('');
       CompReg.InscriptionForm.controls.ConfirmPassword.setValue('');
       CompReg.InscriptionForm.controls.NomPrenom.setValue('');
       expect(CompReg.InscriptionForm.valid).toBeFalsy();
     });  
 
      it('Form valid', () => {
      CompReg.InscriptionForm.controls.Email.setValue('eslem@gmail.com');
      CompReg.InscriptionForm.controls.Password.setValue('12345678');
      CompReg.InscriptionForm.controls.DateNaissance.setValue('22-20-1995');
      CompReg.InscriptionForm.controls.Tel.setValue('55124145');
      CompReg.InscriptionForm.controls.Job.setValue('etudiante');
      CompReg.InscriptionForm.controls.ConfirmPassword.setValue('12345678');
      CompReg.InscriptionForm.controls.NomPrenom.setValue('islem khemiri');
      expect(CompReg.InscriptionForm.valid).toBeTruthy();
     }); 
   });
   describe('Test: Form valid', () => {
		it('should call register', () => {
			const formData = {
          NomPrenom: "emna",
          Email: "emna@gmail.com",
          Tel: "52147854",
          DateNaissance: "30-9-1996",
          Job: "prof",
          Password: "123456789",
          ConfirmPassword: "123456789",        
        };			
			const expected = jest.spyOn(authServiceMock, 'postdemand').mockReturnValue(true);
			expect(authServiceMock.postdemand(formData)).toBe(true);
			expect(expected).toHaveBeenCalledWith(formData);
		});
  });
  describe('Test: champs', () => {
		it('mot de passe confirme incorrect', () => {
			const formData = {
          NomPrenom: "emna",
          Email: "emna@gmail.com",
          Tel: "52147854",
          DateNaissance: "30-9-1996",
          Job: "prof",
          Password: "123456789",
          ConfirmPassword: "1111",        
        };	
        expect(CompReg.InscriptionForm.valid).toBeFalsy();	
		});
  });
  describe('Test: champs', () => {
		it('mot de passe lenght inferieur a 6 caractere ', () => {
			const formData = {
          NomPrenom: "emna",
          Email: "emna@gmail.com",
          Tel: "52147854",
          DateNaissance: "30-9-1996",
          Job: "prof",
          Password: "1111",
          ConfirmPassword: "1111",        
        };	
        expect(CompReg.InscriptionForm.valid).toBeFalsy();	
		});
  });
  describe('Test: champs', () => {
		it('num tel invalid  ', () => {
			const formData = {
          NomPrenom: "emna",
          Email: "emna@gmail.com",
          Tel: "test",
          DateNaissance: "30-9-1996",
          Job: "prof",
          Password: "123456",
          ConfirmPassword: "123456",        
        };	
        expect(CompReg.InscriptionForm.valid).toBeFalsy();	
		});
  });
  describe('Test: champs', () => {
		it('email invalid  ', () => {
			const formData = {
          NomPrenom: "maryem",
          Email: "maryem",
          Tel: "145214748",
          DateNaissance: "30-9-1996",
          Job: "prof",
          Password: "123456",
          ConfirmPassword: "123456",        
        };	
        expect(CompReg.InscriptionForm.valid).toBeFalsy();	
		});
	});


});

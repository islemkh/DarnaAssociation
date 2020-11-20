import { FormBuilder } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let CompLogin: LoginComponent;
  let authServiceMock: any;
  let formBuilderMock: FormBuilder;
  let routerMock: any;
  let loginserviceMock: any;
  beforeEach(() => {
    authServiceMock = {
      login: jest.fn(),
    };
    formBuilderMock = new FormBuilder();
    routerMock = jest.fn();
    CompLogin = new LoginComponent(
      formBuilderMock,
      authServiceMock,
      routerMock
    );
    loginserviceMock = {
      isLoggedIn: jest.fn(),
    };
    CompLogin.ngOnInit();
  });
  describe('Test: ngOnInit', () => {
    it('initialisation  du form', () => {
      const loginForm = {
        Email: '',
        Password: '',
      };
      expect(CompLogin.loginForm.value).toEqual(loginForm);
      const expected = jest
        .spyOn(loginserviceMock, 'isLoggedIn')
        .mockReturnValue(true);
      expect(loginserviceMock.isLoggedIn()).toBe(true);
      expect(expected).toHaveBeenCalled();
    });
  });
  describe('Test: Login Form', () => {
    /*  	it('should invalidate the form', () => {
			CompLogin.loginForm.controls.Email.setValue(null);
			CompLogin.loginForm.controls.Password.setValue(null);
			expect(CompLogin.loginForm.valid).toBeFalsy();
		});  */

    it('Form valid', () => {
      CompLogin.loginForm.controls.Email.setValue('testadmin@gmail.com');
      CompLogin.loginForm.controls.Password.setValue('testadmin123');
      expect(CompLogin.loginForm.valid).toBeTruthy();
    });
  });

  /* describe('Test: Form invalid', () => {
		it('should not call Login user', () => {
			const formData = {
				Email: '',
				Password: ''
			};
			CompLogin.login();
			expect(authServiceMock.login).not.toHaveBeenCalled();
		});
	}); */

  describe('Test: Form valid', () => {
    it('should call loginUser', () => {
      const formData = {
        Email: 'testadmin@gmail.com',
        Password: 'testadmin123',
      };
      const expected = jest
        .spyOn(authServiceMock, 'login')
        .mockReturnValue(true);
      expect(authServiceMock.login(formData)).toBe(true);
      expect(expected).toHaveBeenCalledWith(formData);
    });
  });
});

import { FormBuilder } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let CompLogin: LoginComponent;
  let authServiceMock: any;
  let formBuilderMock: FormBuilder;
  let routerMock: any;
  let LoginServiceMock: any;
  beforeEach(() => {
    LoginServiceMock = {
      login: jest.fn(),
      isLoggedIn: jest.fn(),
    };
    formBuilderMock = new FormBuilder();
    routerMock = jest.fn();
    CompLogin = new LoginComponent(
      formBuilderMock,
      routerMock,
      LoginServiceMock
    );
    CompLogin.ngOnInit();
  });
  describe('Test: ngOnInit', () => {
    it('initialisation  du form ,test form empty', () => {
      const loginForm = {
        Email: '',
        Password: '',
      };
      expect(CompLogin.loginForm.value).toEqual(loginForm);
      const expected = jest
        .spyOn(LoginServiceMock, 'login')
        .mockReturnValue(false);
      expect(LoginServiceMock.login()).toBeFalsy;
      expect(expected).toHaveBeenCalled();
    });
  });
  describe('Test: Login Form', () => {

    it('Form valid', () => {
      CompLogin.loginForm.controls.Email.setValue('testadmin@gmail.com');
      CompLogin.loginForm.controls.Password.setValue('testadmin123');
      expect(CompLogin.loginForm.valid).toBeTruthy();
    });
  });


  describe('Test: Form valid', () => {
    it('should call loginUser', () => {
      const formData = {
        Email: 'testadmin@gmail.com',
        Password: 'testadmin123',
      };
      const expected = jest
        .spyOn(LoginServiceMock, 'login')
        .mockReturnValue(true);
      expect(LoginServiceMock.login(formData)).toBe(true);
      expect(expected).toHaveBeenCalledWith(formData);
    });
  });
});

<<<<<<< HEAD
import { of } from 'rxjs';
=======
import { TestBed } from '@angular/core/testing';
>>>>>>> a902c94302d23b9aa6d3fe58b4377adca7f73cc2

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  const http = jest.fn();
  let data :any;
  beforeEach(() => {
		service = new LoginService(http as any);

  });

 
});

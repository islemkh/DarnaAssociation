
import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let service: RegisterService;
  const http = jest.fn();

  beforeEach(() => {
    service = new RegisterService(http as any);

  });

});

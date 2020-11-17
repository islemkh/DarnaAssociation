import { TestBed } from '@angular/core/testing';

import { ListeDemandeService } from './liste-demande.service';

describe('ListeDemandeService', () => {
  let service: ListeDemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeDemandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

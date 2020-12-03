import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { ListeDemandeComponent } from './liste-demande.component';

describe('ListeDemandeComponent', () => {
  let componentDemandes: ListeDemandeComponent;
  let fixture: ComponentFixture<ListeDemandeComponent>;
  let NgxSpinnerService: any
  let listeDemandeServiceMock: any;
  let formBuilder: FormBuilder;
  let routerMock: any;

  beforeEach(() => {
    listeDemandeServiceMock = {
      getListeDemand: jest.fn(),
      deleteDemand: jest.fn(),
      AcceptDemande: jest.fn()
    };
    formBuilder = new FormBuilder();
    routerMock = jest.fn();

    componentDemandes = new ListeDemandeComponent(
      routerMock,
      listeDemandeServiceMock,
      NgxSpinnerService,
    );
    componentDemandes.ngOnInit();
  });
  describe('Test: demande exist', () => {

    xit('Form valid', () => {
  
    });
  });
});

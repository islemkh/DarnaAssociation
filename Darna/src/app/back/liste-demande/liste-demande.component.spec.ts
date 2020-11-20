import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeComponent } from './liste-demande.component';

describe('ListeDemandeComponent', () => {
  let component: ListeDemandeComponent;
  let fixture: ComponentFixture<ListeDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDemandeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

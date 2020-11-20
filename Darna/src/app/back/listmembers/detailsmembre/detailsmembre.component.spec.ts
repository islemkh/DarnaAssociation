import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsmembreComponent } from './detailsmembre.component';

describe('DetailsmembreComponent', () => {
  let component: DetailsmembreComponent;
  let fixture: ComponentFixture<DetailsmembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsmembreComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsmembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

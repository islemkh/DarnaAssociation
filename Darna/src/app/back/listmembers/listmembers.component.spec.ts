import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmembersComponent } from './listmembers.component';

describe('ListmembersComponent', () => {
  let component: ListmembersComponent;
  let fixture: ComponentFixture<ListmembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListmembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

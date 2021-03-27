import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminHomeComponent } from './user-admin-home.component';

describe('UserAdminHomeComponent', () => {
  let component: UserAdminHomeComponent;
  let fixture: ComponentFixture<UserAdminHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

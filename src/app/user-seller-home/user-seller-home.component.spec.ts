import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSellerHomeComponent } from './user-seller-home.component';

describe('UserSellerHomeComponent', () => {
  let component: UserSellerHomeComponent;
  let fixture: ComponentFixture<UserSellerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSellerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSellerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

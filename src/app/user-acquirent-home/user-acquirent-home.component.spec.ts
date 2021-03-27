import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAcquirentHomeComponent } from './user-acquirent-home.component';

describe('AcquirentHomeComponent', () => {
  let component: UserAcquirentHomeComponent;
  let fixture: ComponentFixture<UserAcquirentHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAcquirentHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAcquirentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

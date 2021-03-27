import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerReservationsComponent } from './seller-reservations.component';

describe('SellerReservationsComponent', () => {
  let component: SellerReservationsComponent;
  let fixture: ComponentFixture<SellerReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

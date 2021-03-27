import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdsListComponent } from './admin-ads-list.component';

describe('AdminAdsListComponent', () => {
  let component: AdminAdsListComponent;
  let fixture: ComponentFixture<AdminAdsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

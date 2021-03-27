import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCalendarComponent } from './ad-calendar.component';

describe('AdCalendarComponent', () => {
  let component: AdCalendarComponent;
  let fixture: ComponentFixture<AdCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

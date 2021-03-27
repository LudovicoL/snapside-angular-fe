import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectAdComponent } from './inspect-ad.component';

describe('InspectAdComponent', () => {
  let component: InspectAdComponent;
  let fixture: ComponentFixture<InspectAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

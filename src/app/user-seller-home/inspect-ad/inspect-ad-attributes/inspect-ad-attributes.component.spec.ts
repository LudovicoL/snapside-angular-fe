import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectAdAttributesComponent } from './inspect-ad-attributes.component';

describe('InspectAdAttributesComponent', () => {
  let component: InspectAdAttributesComponent;
  let fixture: ComponentFixture<InspectAdAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectAdAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectAdAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

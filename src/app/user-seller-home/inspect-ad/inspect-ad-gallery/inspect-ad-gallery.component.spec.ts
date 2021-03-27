import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectAdGalleryComponent } from './inspect-ad-gallery.component';

describe('InspectAdGalleryComponent', () => {
  let component: InspectAdGalleryComponent;
  let fixture: ComponentFixture<InspectAdGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectAdGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectAdGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

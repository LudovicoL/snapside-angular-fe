import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifsListComponent } from './notifs-list.component';

describe('NotifsListComponent', () => {
  let component: NotifsListComponent;
  let fixture: ComponentFixture<NotifsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

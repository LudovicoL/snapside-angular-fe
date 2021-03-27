import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageSchemaComponent } from './admin-manage-schema.component';

describe('AdminManageSchemaComponent', () => {
  let component: AdminManageSchemaComponent;
  let fixture: ComponentFixture<AdminManageSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

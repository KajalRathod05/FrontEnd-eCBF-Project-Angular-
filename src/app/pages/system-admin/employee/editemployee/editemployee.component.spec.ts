import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditemployeeComponent } from './editemployee.component';

describe('EditemployeeComponent', () => {
  let component: EditemployeeComponent;
  let fixture: ComponentFixture<EditemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditemployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

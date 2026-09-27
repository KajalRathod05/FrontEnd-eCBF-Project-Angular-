import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditinsuranceComponent } from './editinsurance.component';

describe('EditinsuranceComponent', () => {
  let component: EditinsuranceComponent;
  let fixture: ComponentFixture<EditinsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditinsuranceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditinsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

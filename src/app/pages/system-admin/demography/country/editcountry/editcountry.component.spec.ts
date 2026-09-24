import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcountryComponent } from './editcountry.component';

describe('EditcountryComponent', () => {
  let component: EditcountryComponent;
  let fixture: ComponentFixture<EditcountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditcountryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

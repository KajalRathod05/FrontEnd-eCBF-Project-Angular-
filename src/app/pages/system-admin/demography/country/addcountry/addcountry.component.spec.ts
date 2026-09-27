import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcountryComponent } from './addcountry.component';

describe('AddcountryComponent', () => {
  let component: AddcountryComponent;
  let fixture: ComponentFixture<AddcountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddcountryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

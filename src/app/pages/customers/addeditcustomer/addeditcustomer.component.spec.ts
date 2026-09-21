import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditcustomerComponent } from './addeditcustomer.component';

describe('AddeditcustomerComponent', () => {
  let component: AddeditcustomerComponent;
  let fixture: ComponentFixture<AddeditcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddeditcustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

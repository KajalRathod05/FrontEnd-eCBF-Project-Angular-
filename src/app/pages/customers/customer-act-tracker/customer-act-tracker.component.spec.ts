import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerActTrackerComponent } from './customer-act-tracker.component';

describe('CustomerActTrackerComponent', () => {
  let component: CustomerActTrackerComponent;
  let fixture: ComponentFixture<CustomerActTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerActTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerActTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

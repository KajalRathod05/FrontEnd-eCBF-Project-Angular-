import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaonbookedReportComponent } from './laonbooked-report.component';

describe('LaonbookedReportComponent', () => {
  let component: LaonbookedReportComponent;
  let fixture: ComponentFixture<LaonbookedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaonbookedReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaonbookedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

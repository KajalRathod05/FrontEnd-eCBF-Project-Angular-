import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerReportComponent } from './borrower-report.component';

describe('BorrowerReportComponent', () => {
  let component: BorrowerReportComponent;
  let fixture: ComponentFixture<BorrowerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BorrowerReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

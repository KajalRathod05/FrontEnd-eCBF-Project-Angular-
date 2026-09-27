import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrolerightsComponent } from './addrolerights.component';

describe('AddrolerightsComponent', () => {
  let component: AddrolerightsComponent;
  let fixture: ComponentFixture<AddrolerightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddrolerightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddrolerightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

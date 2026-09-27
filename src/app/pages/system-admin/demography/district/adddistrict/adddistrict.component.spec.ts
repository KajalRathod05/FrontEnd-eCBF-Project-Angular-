import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddistrictComponent } from './adddistrict.component';

describe('AdddistrictComponent', () => {
  let component: AdddistrictComponent;
  let fixture: ComponentFixture<AdddistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdddistrictComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdddistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

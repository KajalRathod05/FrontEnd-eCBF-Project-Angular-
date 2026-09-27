import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddborrowerComponent } from './addborrower.component';

describe('AddborrowerComponent', () => {
  let component: AddborrowerComponent;
  let fixture: ComponentFixture<AddborrowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddborrowerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddborrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwarehouseComponent } from './addwarehouse.component';

describe('AddwarehouseComponent', () => {
  let component: AddwarehouseComponent;
  let fixture: ComponentFixture<AddwarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddwarehouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddwarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

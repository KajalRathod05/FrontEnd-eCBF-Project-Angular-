import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcommodityComponent } from './editcommodity.component';

describe('EditcommodityComponent', () => {
  let component: EditcommodityComponent;
  let fixture: ComponentFixture<EditcommodityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditcommodityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

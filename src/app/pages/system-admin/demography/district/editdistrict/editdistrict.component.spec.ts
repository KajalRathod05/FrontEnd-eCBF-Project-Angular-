import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdistrictComponent } from './editdistrict.component';

describe('EditdistrictComponent', () => {
  let component: EditdistrictComponent;
  let fixture: ComponentFixture<EditdistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditdistrictComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditdistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

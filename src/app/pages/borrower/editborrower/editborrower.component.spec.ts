import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditborrowerComponent } from './editborrower.component';

describe('EditborrowerComponent', () => {
  let component: EditborrowerComponent;
  let fixture: ComponentFixture<EditborrowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditborrowerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditborrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

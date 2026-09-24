import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrolerightsComponent } from './editrolerights.component';

describe('EditrolerightsComponent', () => {
  let component: EditrolerightsComponent;
  let fixture: ComponentFixture<EditrolerightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditrolerightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditrolerightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

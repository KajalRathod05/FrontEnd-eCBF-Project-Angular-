import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstateComponent } from './addstate.component';

describe('AddstateComponent', () => {
  let component: AddstateComponent;
  let fixture: ComponentFixture<AddstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddstateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

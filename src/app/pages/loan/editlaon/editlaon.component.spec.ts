import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlaonComponent } from './editlaon.component';

describe('EditlaonComponent', () => {
  let component: EditlaonComponent;
  let fixture: ComponentFixture<EditlaonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditlaonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditlaonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolerightsComponent } from './rolerights.component';

describe('RolerightsComponent', () => {
  let component: RolerightsComponent;
  let fixture: ComponentFixture<RolerightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolerightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolerightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

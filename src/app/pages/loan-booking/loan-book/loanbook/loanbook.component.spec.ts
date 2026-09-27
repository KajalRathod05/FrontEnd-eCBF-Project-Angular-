import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanbookComponent } from './loanbook.component';

describe('LoanbookComponent', () => {
  let component: LoanbookComponent;
  let fixture: ComponentFixture<LoanbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanbookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

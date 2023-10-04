import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashIconComponent } from './trash-icon.component';

describe('TrashIconComponent', () => {
  let component: TrashIconComponent;
  let fixture: ComponentFixture<TrashIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrashIconComponent]
    });
    fixture = TestBed.createComponent(TrashIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

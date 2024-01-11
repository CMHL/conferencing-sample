import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadGridComponent } from './quad-grid.component';

describe('QuadGridComponent', () => {
  let component: QuadGridComponent;
  let fixture: ComponentFixture<QuadGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuadGridComponent]
    });
    fixture = TestBed.createComponent(QuadGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

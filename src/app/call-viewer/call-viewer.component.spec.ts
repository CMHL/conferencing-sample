import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallViewerComponent } from './call-viewer.component';

describe('CallViewerComponent', () => {
  let component: CallViewerComponent;
  let fixture: ComponentFixture<CallViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallViewerComponent]
    });
    fixture = TestBed.createComponent(CallViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

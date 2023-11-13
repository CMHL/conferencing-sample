import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwilioCallViewerComponent } from './twilio-call-viewer.component';

describe('TwilioCallViewerComponent', () => {
  let component: TwilioCallViewerComponent;
  let fixture: ComponentFixture<TwilioCallViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwilioCallViewerComponent]
    });
    fixture = TestBed.createComponent(TwilioCallViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

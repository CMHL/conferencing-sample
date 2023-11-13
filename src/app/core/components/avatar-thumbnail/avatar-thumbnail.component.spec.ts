import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarThumbnailComponent } from './avatar-thumbnail.component';

describe('AvatarThumbnailComponent', () => {
  let component: AvatarThumbnailComponent;
  let fixture: ComponentFixture<AvatarThumbnailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarThumbnailComponent]
    });
    fixture = TestBed.createComponent(AvatarThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

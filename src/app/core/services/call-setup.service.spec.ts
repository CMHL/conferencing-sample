import { TestBed } from '@angular/core/testing';

import { CallSetupService } from './call-setup.service';

describe('CallSetupService', () => {
  let service: CallSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

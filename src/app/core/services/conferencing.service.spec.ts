import { TestBed } from '@angular/core/testing';

import { ConferencingService } from './conferencing.service';

describe('ConferencingService', () => {
  let service: ConferencingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConferencingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

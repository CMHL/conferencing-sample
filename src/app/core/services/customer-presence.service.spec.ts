import { TestBed } from '@angular/core/testing';

import { CustomerPresenceService } from './customer-presence.service';

describe('CustomerPresenceService', () => {
  let service: CustomerPresenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerPresenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

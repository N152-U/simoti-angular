import { TestBed } from '@angular/core/testing';

import { HypochloriteEgressService } from './hypochlorite-egress.service';

describe('HypochloriteEgressService', () => {
  let service: HypochloriteEgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HypochloriteEgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

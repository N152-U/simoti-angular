import { TestBed } from '@angular/core/testing';

import { ManageFacilitiesService } from './manage-facilities.service';

describe('ManageFacilitiesService', () => {
  let service: ManageFacilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageFacilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

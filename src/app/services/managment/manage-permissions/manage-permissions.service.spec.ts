import { TestBed } from '@angular/core/testing';

import { ManagePermissionsService } from './manage-permissions.service';

describe('ManagePermissionsService', () => {
  let service: ManagePermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagePermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

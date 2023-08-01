import { TestBed } from '@angular/core/testing';

import { ManageModulesService } from './manage-modules.service';

describe('ManageModulesService', () => {
  let service: ManageModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

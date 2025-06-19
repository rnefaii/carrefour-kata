import { TestBed } from '@angular/core/testing';

import { LeasingContractService } from './leasing-contract.service';

describe('LeasingContractService', () => {
  let service: LeasingContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeasingContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

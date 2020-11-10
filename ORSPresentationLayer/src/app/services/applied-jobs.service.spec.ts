import { TestBed } from '@angular/core/testing';

import { AppliedJobsService } from './applied-jobs.service';

describe('AppliedJobsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppliedJobsService = TestBed.get(AppliedJobsService);
    expect(service).toBeTruthy();
  });
});

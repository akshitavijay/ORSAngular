import { TestBed } from '@angular/core/testing';

import { JobApplicantsService } from './job-applicants.service';

describe('JobApplicantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobApplicantsService = TestBed.get(JobApplicantsService);
    expect(service).toBeTruthy();
  });
});

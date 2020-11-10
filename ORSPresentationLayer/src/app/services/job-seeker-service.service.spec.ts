import { TestBed } from '@angular/core/testing';

import { JobSeekerServiceService } from './job-seeker-service.service';

describe('JobSeekerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobSeekerServiceService = TestBed.get(JobSeekerServiceService);
    expect(service).toBeTruthy();
  });
});

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Applicant} from '../models/applicant'
import { Job } from '../models/job';
import { JobSeekerClass } from '../models/job-seeker-class';

@Injectable({
  providedIn: 'root'
})
export class JobApplicantsService {

  constructor(private http:HttpClient) { }
  readonly rooturl = 'https://localhost:44379/api/Applicants';

  getJobSeekers(jobId:number):Observable<JobSeekerClass[]>
  {
    return this.http.get<JobSeekerClass[]>(this.rooturl + '/JobApplicants/'+jobId);
    
  }
}

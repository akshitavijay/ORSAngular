import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Applicant } from '../models/applicant';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class AppliedJobsService {

  constructor(private http:HttpClient) { }
  readonly rooturl = 'https://localhost:44379/api/Applicants';


  
  
  getJobDetails(jobSeekerId:number):Observable<Job[]>
  {
    return this.http.get<Job[]>(this.rooturl + '/GetJobDetails/'+jobSeekerId);
    
  }
  
}

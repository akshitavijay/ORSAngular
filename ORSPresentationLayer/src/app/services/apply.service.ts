import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from '../models/job';
import { Applicant } from '../models/applicant';
import {HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplyService {

  constructor(private http: HttpClient) { }

  readonly rooturl = 'https://localhost:44379/api';
 


  getJobDetails(jobId:number):Observable<Job>
  {
    return this.http.get<Job>(this.rooturl +'/Jobs/'+jobId);

  }

  getJobSeekerId(userId:number)
  {
    return this.http.get<number>(this.rooturl + '/Applicants/GetJobSeekerId/' +userId);
  }
  addApplicant(applicant : Applicant)
 {
   console.log("Inside Service apply :",applicant);
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
  return this.http.post<Applicant>(this.rooturl + '/Applicants/', applicant, httpOptions)
 }
}



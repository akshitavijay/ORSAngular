import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  postedJob : Job;
  list : Job[];
  readonly rootURLJob="https://localhost:44379/api"
  constructor(private http: HttpClient) { }
  postJob(postedJob: Job){
    return this.http.post(this.rootURLJob+'/Jobs',postedJob);
  }
  refreshJobList(){
    this.http.get(this.rootURLJob+'/Jobs')
    .toPromise().then(res=>this.list=res as Job[])
  }
  putJob(postedJob: Job){
    
    return this.http.put(this.rootURLJob+'/Jobs/'+postedJob["JobId"],postedJob);
  }
  deleteJob(id : number){
    console.log("INSIDE SERVICE : ",id);
    return this.http.delete(this.rootURLJob+'/Jobs/'+id);
  }
  getAllJobs()
  {
    return this.http.get('https://localhost:44379/api/Jobs');
  }

  getSingleJobs(id:number)
  {
    return this.http.get('https://localhost:44379/api/Jobs/'+id);
  }
}

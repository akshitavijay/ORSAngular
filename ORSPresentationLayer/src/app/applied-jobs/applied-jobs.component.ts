import { Component, OnInit } from '@angular/core';
import { Applicant } from '../models/applicant';
import { Job } from '../models/job';
import { AppliedJobsService } from '../services/applied-jobs.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {
  
  jobSeekerId:number;
  allJobs: Observable<Job[]>;


  constructor(public service:AppliedJobsService, private route:ActivatedRoute, private router: Router) { 
    this.route.params.subscribe((newParams:Params)=>{
      this.jobSeekerId = newParams['jobSeekerId'];
      console.log(this.jobSeekerId);
    })
   }

   //to see the list of all the jobs a jobSeeeker has applied for
   ngOnInit() {
    this.service.getJobDetails(this.jobSeekerId).subscribe(allJobs=>{
      console.log(allJobs);
      this.allJobs = this.service.getJobDetails(this.jobSeekerId);
    })



  //   this.service.getJobIds(this.jobSeekerId).subscribe(postData=>{
  //   console.log(postData);
  //   this.applicants = postData;
      
  //   },    
  //   errorData=>
  //     {
  //       alert("Job details NOT FOUND!!"); 
  //       if(errorData.error==null && errorData.status==404 && errorData.statusText=="OK" )
  //         {
  //             alert("Job details NOT FOUND!!");
  //         } 
  //     });
      
   }
  
}

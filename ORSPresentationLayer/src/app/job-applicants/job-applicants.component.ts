import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JobApplicantsService } from '../services/job-applicants.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobSeekerClass } from '../models/job-seeker-class';

@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.css']
})
export class JobApplicantsComponent implements OnInit {

  jobId : number;
  allJobSeekers: Observable<JobSeekerClass[]>;
  constructor(public service:JobApplicantsService, private route:ActivatedRoute, private router: Router) { 
       this.route.params.subscribe((newParams:Params)=>{
      this.jobId = newParams['jobId'];
      console.log(this.jobId);
    })
  }

  //to fetch list of all the job applicants
  ngOnInit() {
    this.service.getJobSeekers(this.jobId).subscribe(allJobSeekers=>{
      console.log(allJobSeekers);
      this.allJobSeekers = this.service.getJobSeekers(this.jobId);
    })
  }

}

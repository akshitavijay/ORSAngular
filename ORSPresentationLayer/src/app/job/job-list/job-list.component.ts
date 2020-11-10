import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  constructor(private service: JobService,private routerBtn:Router) { }

  jobList:Job[]=[];


  ngOnInit() {
    this.service.refreshJobList();
    this.service.getAllJobs().subscribe(res=>{
      this.jobList = res as Job[];
    })
  }
populateForm(jobavail : Job){
  this.service.getSingleJobs(+jobavail["jobId"]).subscribe(res=>{
    this.service.postedJob = res as Job;
  })  
}
onDelete(id: number){
  if(confirm("Are you sure you want to delete it?")){
    this.service.deleteJob(id).subscribe(res=>{
      this.service.refreshJobList();     
  })
}
}

viewApplicants(jobId:number)
{
  this.routerBtn.navigate(['/job-applicants/'+jobId]);
}


}
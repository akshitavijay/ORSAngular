import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-insert-update',
  templateUrl: './job-insert-update.component.html',
  styleUrls: ['./job-insert-update.component.css']
})
export class JobInsertUpdateComponent implements OnInit {

  constructor(private service: JobService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
    this.service.postedJob={
        jobId : null,
        employerId : null,
        companyName : "",
        jobCategory: "",
        jobTitle: "",
        requiredSkills: "",
        currentOpenings : null,
        joiningDate : null,
        location: "",
        designation: "",
        experience : null, 
        qualification: ""   
      }
  }
  //function to submit form data
  onSubmit(form: NgForm){
if(form.value.JobId == null)
    this.insertRecord(form);
else
    this.updateRecord(form);
  }
  //function to enter new record
 insertRecord(form:NgForm){
   this.service.postJob(form.value).subscribe(res=>{
     this.resetForm(form);
     this.service.refreshJobList();
   })
 }
 //fuction to update record
 updateRecord(form : NgForm){
   console.log(form.value);
   this.service.putJob(form.value).subscribe(res=>{
     this.resetForm(form);
     this.service.refreshJobList();
   })
 }
}

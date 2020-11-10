import { Component, OnInit } from '@angular/core';
import { ApplyService } from '../services/apply.service';
import { Job } from '../models/job';
import { Applicant } from '../models/applicant';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  //applicationForm: FormGroup;
  
  jobDetails:Job;
  addForm: any;
  jobId:number;
  userId:number;
  jobSeekerId:number;
  applicant: Applicant={
    applicationNo:0,
    jobId:0,
    jobSeekerId:0
  };

  constructor(public service: ApplyService, private route:ActivatedRoute, private router: Router) { 
    // this.route.params.subscribe((newParams:Params)=>{
    //   this.userId = newParams['userId'];
    //   console.log(this.jobId);
    // });

    this.route.params.subscribe((newParams:Params)=>{
      this.jobId = newParams['jobId'];
      console.log("APPLY COMPONENT :",this.jobId);
    });

    this.userId = +JSON.parse(localStorage.getItem('authUserData'))["userId"];
    console.log(this.userId);

    this.addForm = new FormGroup({
      jobId: new FormControl(null),
      companyName: new FormControl(null),
      jobCategory: new FormControl(null),
      jobTitle: new FormControl(null),
      requiredSkills: new FormControl(null),
      currentOpenings: new FormControl(null),
      joiningDate: new FormControl(null),
      location: new FormControl(null),
      designation: new FormControl(null),
      experience: new FormControl(null),
      qualification: new FormControl(null)
    });
  }


  ngOnInit()
  {
     this.service.getJobDetails(this.jobId).subscribe(postData=>{
      
      this.addForm.get("jobId").setValue(postData.jobId);
      this.addForm.get("companyName").setValue(postData.companyName);
      this.addForm.get("jobCategory").setValue(postData.jobCategory);
      this.addForm.get("jobTitle").setValue(postData.jobTitle);
      this.addForm.get("requiredSkills").setValue(postData.requiredSkills);
      this.addForm.get("currentOpenings").setValue(postData.currentOpenings);
      this.addForm.get("joiningDate").setValue(postData.joiningDate);
      this.addForm.get("location").setValue(postData.location);
      this.addForm.get("designation").setValue(postData.designation);
      this.addForm.get("experience").setValue(postData.experience);
      this.addForm.get("qualification").setValue(postData.qualification);
      
      console.log(postData);
     
    },    
    errorData=>
      {
        alert("Job details NOT FOUND!!"); 
        if(errorData.error==null && errorData.status==404 && errorData.statusText=="OK" )
          {
              alert("Job details NOT FOUND!!");
          } 
      });
      this.service.getJobSeekerId(this.userId).subscribe(res=>{
        this.jobSeekerId=res;
        console.log(this.jobSeekerId);
      })
  }
  
  //To save data in Applicant Table(apply for a job)
  onClick()
  {
    

   
    this.applicant.jobId=this.jobId;
    this.applicant.jobSeekerId=this.jobSeekerId;
    // console.log(this.jobDetails.jobId);
    // this.applicant.jobId =+this.jobDetails.jobId;
    // console.log("Applicant iD:",this.applicant.jobId);
    // this.applicant.jobSeekerId = 1001;
    this.service.addApplicant(this.applicant).subscribe(res=>{
      console.log(res);
      alert('Applied Successfully!');
      const userID = +JSON.parse(localStorage.getItem('authUserData'))["userId"];
      this.router.navigate(['/jobseeker-details/'+userID]);
    },
     (err) =>{
        alert('Sorry You are not eligible!')
    })
  }
}
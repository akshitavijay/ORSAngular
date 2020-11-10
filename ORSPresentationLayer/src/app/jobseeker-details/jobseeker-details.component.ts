import { Component, OnInit } from '@angular/core';
import { JobSeekerClass } from '../models/job-seeker-class';
import { JobSeekerServiceService } from '../services/job-seeker-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-jobseeker-details',
  templateUrl: './jobseeker-details.component.html',
  styleUrls: ['./jobseeker-details.component.css']
})
export class JobseekerDetailsComponent implements OnInit {

  detailsForm : any;
  userId: number;
  resumePath: any;
  show: boolean;
  jobSeekerId:number;
  

  constructor(private jobseekerservice:JobSeekerServiceService, private sanitizer: DomSanitizer,
    private route:ActivatedRoute, private router: Router) {
      this.route.params.subscribe((newParams:Params)=>{
        this.userId = newParams['id'];
        console.log(typeof this.userId);
      })

    this.detailsForm = new FormGroup({
      userId: new FormControl(null),
      address: new FormControl(null),
      experience: new FormControl(null),
      qualification: new FormControl(null),
      profession: new FormControl(null),
      skillSet: new FormControl(null),
      resume: new FormControl(null)
    });

    
   }

  ngOnInit() {     

    this.loadData();
  }

  loadData(){
    
    this.jobseekerservice.GetSeekerByUserId(+this.userId).subscribe(
      jobseeker =>{
        console.log("INSIDE COMPONENT :",jobseeker);
      this.resumePath = jobseeker.resume;
      this.jobSeekerId = jobseeker.jobSeekerId;
      this.detailsForm.get("userId").setValue(jobseeker.userId);
      this.detailsForm.get("address").setValue(jobseeker.address);
      this.detailsForm.get("experience").setValue(jobseeker.experience);
      this.detailsForm.get("qualification").setValue(jobseeker.qualification);
      this.detailsForm.get("profession").setValue(jobseeker.profession);
      this.detailsForm.get("skillSet").setValue(jobseeker.skillSet);
      this.detailsForm.get("resume").setValue(jobseeker.resume);

      if(this.resumePath == ""){
        this.show = true;
      }
      else{
        this.show = false;
      }
      },
      (error) =>{
        console.log(error);
        
      }
    );
    
  }

  resumeURL() {
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.resumePath);
    
  }

  editDetails(){
    this.router.navigate(['/jobseeker', this.userId]);
  }

  view(){
    this.router.navigate(['/applied-jobs/'+this.jobSeekerId]);
  }

}



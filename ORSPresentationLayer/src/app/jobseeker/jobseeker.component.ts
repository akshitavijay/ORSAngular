import { Component, OnInit } from '@angular/core';
import { JobSeekerClass } from '../models/job-seeker-class';
import { JobSeekerServiceService } from '../services/job-seeker-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { rangeValidator } from '../validators/custom.validators.ts';

@Component({
  selector: 'app-jobseeker',
  templateUrl: './jobseeker.component.html',
  styleUrls: ['./jobseeker.component.css']
})
export class JobseekerComponent implements OnInit {

  allJobSeekers: Observable<JobSeekerClass[]>;
  addForm: FormGroup;
  resume: any;
  userId: number;
  show: boolean;
  buttonName: string ;
  heading: string;
  message: string;

  constructor(private jobseekerservice:JobSeekerServiceService, private route:ActivatedRoute, private router: Router) {

    this.route.params.subscribe((newParams:Params)=>{
      this.userId = newParams['id'];
      console.log(this.userId);
    })

    this.addForm = new FormGroup({
      userId: new FormControl(null),
      address: new FormControl('',[Validators.maxLength(100)]),
      experience: new FormControl('',[Validators.min(0), Validators.max(44)]),
      qualification: new FormControl(null),
      profession: new FormControl('',[Validators.maxLength(40)]),
      skillSet: new FormControl('',[Validators.maxLength(40)]),
      resume: new FormControl('',[])
    });
   }

  ngOnInit() {
    this.loadSeekers();
    this.loadData();
  }

  loadData(){
    
    this.jobseekerservice.GetSeekerByUserId(this.userId).subscribe(
      (jobseeker) =>{
        console.log(jobseeker);
      
      this.addForm.get("userId").setValue(jobseeker.userId);
      this.addForm.get("address").setValue(jobseeker.address);
      this.addForm.get("experience").setValue(jobseeker.experience);
      this.addForm.get("qualification").setValue(jobseeker.qualification);
      this.addForm.get("profession").setValue(jobseeker.profession);
      this.addForm.get("skillSet").setValue(jobseeker.skillSet);
      // this.addForm.get("resume").setValue(jobseeker.resume);

      if(jobseeker.qualification == ""){
        this.show = true;
        this.buttonName = "Add Details";
        this.heading = "Add Your Details";
        this.message = "Details Added Successfully!!";
      }
      else{
        this.show = false;
        this.buttonName = "Edit Details";
        this.heading = "Edit Your Details";
        this.message = "Details Updated Successfully!!";
      }
      },
      (error) =>{
        console.log(error);
        
      }
    );
    
  }

  loadSeekers(){
    this.allJobSeekers = this.jobseekerservice.GetJobSeekers();
  }

  //file uplaod change event method
  //for add details
  onUpload(event){
    if(event.target.files.length > 0) 
    {
      this.resume = "../assets/documents/" + event.target.files[0].name;
    }
  }

  addDetails(){
    let newseeker = new JobSeekerClass();
    newseeker.userId = this.addForm.value.userId;
    newseeker.address = this.addForm.value.address;
    newseeker.experience = this.addForm.value.experience;
    newseeker.qualification = this.addForm.value.qualification;
    newseeker.profession = this.addForm.value.profession;
    newseeker.skillSet = this.addForm.value.skillSet;
    newseeker.resume = this.resume;

    //service call to add product
    this.jobseekerservice.AddDetails(newseeker).subscribe(
      (response) =>{
      alert(this.message);
      this.router.navigate(['/jobseeker-details', this.userId]);
      },
      (error:any) =>{
        //if any error occur
        console.log(error.message);
        alert("Something happened wrong. Please try again with valid inputs!!");
      }
    );

    
  }

  
}

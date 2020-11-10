import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../models/job';
import { SearchService } from '../services/search.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public jobDetails : Job[];
  isLoggedIn:boolean = false;

  //Constructor
  constructor(public service : SearchService, private userService:UserService,private routerBtn:Router) { }


  ngOnInit(): void {
    //Subscribing to service to get all Jobs List
    this.service.getAllJobs().subscribe(res=>{
      console.log(res);
      this.jobDetails = res as Job[];
    })

    //checking if user is logged-in
    this.userService.loggedIn.subscribe(res=>{
      if(res)
      {
        this.isLoggedIn = true;
      }
    })

  }

  //Passing the search values
  onSearch(form:any){
    console.log("In component:"+form.value);
   
    //Subscribe the getJobDetails method to service
    this.service.getJobDetails(form.value.searchBy,form.value.search)
      .subscribe(data =>{ 
        console.log(data);
        this.jobDetails=data
      });
      console.log(this.jobDetails);
    
  }

  //apply for job
  applyJob(jobId:number)
  {
    // console.log("JOB ID : ",jobId);
    this.routerBtn.navigate(['/apply/'+jobId]);

  }


}

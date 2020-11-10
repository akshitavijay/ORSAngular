import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

      //declare reactive form of type FormGroup
      updateForm:FormGroup=null;
  
      //to receive the status whether form is submitted or not
      isUserUpdated:boolean=false;
      //declare isSubmitted bit to perform operations after the form isSubmitted
      isFormSubmitted=false;
    
      //to store User type object
      user:Users
        = {UserId:null, UserName:null,Password:null, Email:null,
          Phone:null, Gender:null, RoleId:null};
    
    
      //constructor used for injecting dependency
      constructor(private router: Router,private adminService:AdminService,private route:ActivatedRoute) { }
    
      id:number;
      //ngOnInit used for initialising properties of the class
      ngOnInit(): void {

       
        this.route.params.subscribe((newParams:Params)=>{
            this.id=newParams['id'];
        })

           //gets the user to be updated by passing it's userId into getUser method 
   this.adminService.getUser(+this.id).subscribe(res=>{
    console.log(res);
    //the fetched user is stored in a variable 
    this.user = res as Users;
    console.log("USRRS",this.user);
  })


}

editForm(form:NgForm)
{
  console.log(form.value);

  // this put method passes the user with updated values to be stored in the database
  this.adminService.putUser(form.value).subscribe(res=>{
    console.log(res);
    //once the user data is saved it redirects to the admin portal
    this.router.navigate(['/admin']);
  },err=>{
    console.log(err);
  })   

}
}

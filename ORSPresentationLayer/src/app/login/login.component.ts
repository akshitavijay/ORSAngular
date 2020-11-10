import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from '../models/users';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   //setting default variables for input fields
  defaultEmail="";
  defaultPass="";

           //injecting services
  constructor(private userService:UserService,private routerBtn:Router,private toastr:ToastrService) { }

  ngOnInit() {
  }


  //method to signin a user
  loginUser(form:NgForm)
  {
    console.log(form.value);

      //sending form value to API via service's method
    this.userService.loginUser(form.value).subscribe((res:Users)=>{
      console.log(res);
      // console.log(res["userId"])
      
      this.toastr.success("Login Successful!!","SUCCESS");

      //emitting new authentication state
      this.userService.loggedIn.next(true);

      //emitting new authenticated user
      this.userService.authUser.next(res);

      //storing authenticated user in localStorage
      localStorage.setItem('authUserData',JSON.stringify(res));


      //JOBSEEKER related route
      if(res["roleId"]==3)
      {
        //redirecting to another page
        this.routerBtn.navigate(['/jobseeker-details/'+res["userId"]]);
        
      }
      
      //EMPLOYER related route
      if(res["roleId"]==2)
      {
        //redirecting to another page
        this.routerBtn.navigate(['/job']);
      }
      
       //ADMIN related route
      if(res["roleId"]==1)
      {
        //redirecting to another page
        this.routerBtn.navigate(['/admin']);
      }

    },err=>{
       //if user does not exists
      if(err["status"]==404)
      {       
         //displaying a toaster error message
        this.toastr.error(err["error"]+'!!',"Login Failed",{
          timeOut:2000
        });
      }
    })
  
  }

}

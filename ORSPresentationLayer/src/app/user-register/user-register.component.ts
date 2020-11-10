import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  //setting default variables for input fields
  defaultGender = "M";
  defaultRoleID = "3";
  defaultEmail = "";
  defaultPhone = "";
  defaultPass="";
  defaultName="";

              //injecting services
  constructor(private userService:UserService,private routerBtn:Router,private toastr:ToastrService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(res=>{
      console.log(res);
    })
  }

  //method to register a new user
  addUser(form:NgForm)
  {
    console.log("Form Data : ",form.value);
    //converting roleID to integer
    form.value.roleId = +form.value.roleId;


    //saving to database
    this.userService.postUser(form.value).subscribe(res=>{
      console.log(res);

      //displaying a toaster success message
      this.toastr.success("Registration Successful!!","SUCCESS",{
        timeOut:2000
      });

      //redirecting to login page
      this.routerBtn.navigate(['/login']);

    },err=>{
      //if conflict error exists
      if(err["status"]==409)
      {
         //displaying a toaster error message
        this.toastr.error("Email Already Exists!!!!","Registration Failed",{
          timeOut:2000
        });
      }
    })


  }

}

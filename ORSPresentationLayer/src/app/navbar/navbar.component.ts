import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean = false;

  constructor(private userService:UserService,private routerBtn:Router) { }

  ngOnInit() {

   // this.userService.autoLogin();
    // console.log(localStorage.getItem('authUserData'));

    this.userService.loggedIn.subscribe(res=>{
      console.log(res);
      this.isLoggedIn = res;
      if(res)
      {
        this.userService.authUser.subscribe(res=>{
          console.log(res);
          console.log(JSON.parse(localStorage.getItem('authUserData')));
        })
      }
      
    })

  }

  goToProfile()
  {
      //retrieving the roleId of logged-in user
      const userRole = +JSON.parse(localStorage.getItem('authUserData'))["roleId"];
      //retrieving the userId of logged-in user
      const userID = +JSON.parse(localStorage.getItem('authUserData'))["userId"];
      console.log(userID);
     
      //JOBSEEKER related route
      if(userRole==3)
      {
        //redirecting to another page
        this.routerBtn.navigate(['/jobseeker-details/'+userID]);
        
      }
      
      //EMPLOYER related route
      if(userRole==2)
      {
        //redirecting to another page
        this.routerBtn.navigate(['/job']);
      }
      
       //ADMIN related route
      if(userRole==1)
      {
        //redirecting to another page
        this.routerBtn.navigate(['/admin']);
      }
  }



  logout()
  {
    this.userService.logout();
  
   
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Users } from '../models/users';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //accessing the URL from environment file
  private SERVER_URL = environment.SERVER_URL;


  //Behaviour subject for storing authentication state
  loggedIn = new BehaviorSubject<boolean>(false);

  //Behaviour subject for storing the user
  authUser = new BehaviorSubject<Users>(null);
  

  //injecting instance of HttpClient(to make HTTP requests)
  constructor(private http:HttpClient,
        private routerBtn:Router) { }


  //method to fetch all users
  getAllUsers()
  {
    return this.http.get(this.SERVER_URL+'/Users');
  }

  //method to post a new user
  postUser(data)
  {
    return this.http.post(this.SERVER_URL+'/Users',data);
  }

  //method to send signin request to webapi
  loginUser(data)
  {    
    return this.http.get(this.SERVER_URL+'/Users/signin/'+data.email+'/'+data.password);
  } 


  //method to implement auto-login functionality
  autoLogin()
  {
  //now we will retrieve all data from local storage , whenever the application restarts             
      const authUserInfo = localStorage.getItem('authUserData');
      console.log(authUserInfo);
      //checking if that data key exists
      if(!authUserInfo)
      {
          return;
      }
      else{
        //emitting login details to BehaviourSubject
        this.loggedIn.next(true);
        this.authUser.next(JSON.parse(authUserInfo));
      }
  }


  //method to implement LOGOUT  functionality
  logout()
  {
      //now emitting no user  (setting our User to null)
      this.loggedIn.next(false);

      this.authUser.next(null);
       
      //also, removing user data from localStorage
      localStorage.removeItem('authUserData');
      
       //redirecting to different component
    this.routerBtn.navigate(['/login']);
  }
  

}

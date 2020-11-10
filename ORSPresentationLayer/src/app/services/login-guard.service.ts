import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {


  constructor(private userService:UserService, private router:Router)
  {

  }

  //it recieves currently activated route , and router state snapshot
  canActivate(route:ActivatedRouteSnapshot, router:RouterStateSnapshot) : boolean | Promise<boolean> | Observable<boolean|UrlTree>
  {
     
      return this.userService.authUser.pipe( 
          take(1),    //to make sure,  we always take the latest user value   
          map(user=>{
          const isAuth =  !!user;
          //we will now retrieve user to diff. page(if he is not authenticated, and try to visit secured page)
          if(!isAuth)
          {
             return true;
            
          }
          else{
              //we will create URL Tree
              return this.router.createUrlTree(['/home']);
          }
      }
   ));
       
  }
  //Now we will use this in front of guards we want to protect



}

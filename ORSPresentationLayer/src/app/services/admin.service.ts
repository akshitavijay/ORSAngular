import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  saveId: number = null;    

    //property will hold prefix of the url present in request to web api
    apiPrefix:string;

    //constructor for injecting dependencies
    constructor(private httpClient:HttpClient){

    }

    //initialise properties of class in ngOnInit()
    ngOnInit(){
        this.apiPrefix='https://localhost:44379"';
    }

    
    // get all the users by calling GetUsers() in web api controller
    getUsers():Observable<Users[]>{

        return this.httpClient.get<Users[]>("https://localhost:44379/api/admin");
    }

    //it returns zero or one user corresponding to the passed id
    getUser(userId:number):Observable<Users>
    {
            console.log("INSIDE SERVICE : ",userId);
        //alert(userId+'text')
        return this.httpClient.get<Users>("https://localhost:44379/api/admin/"+userId);
    }

    //returns the boolean value indicating whether passed user updated or not
    putUser(user:Users):Observable<boolean>{
        console.log("INSIDE SERVICE :",user);
        //alert(JSON.stringify(user))
        return this.httpClient.put<boolean>("https://localhost:44379/api/admin/"+user['userId'],user);

    }

    //returns boolean value indicating whether user with passed userId is deleted or not
    deleteUser(userId:number):Observable<boolean>
    {
        console.log("INSIDE SERVICE : ",userId);
        return this.httpClient.delete<boolean>("https://localhost:44379/api/admin/"+userId);
    }
}

import { Injectable } from '@angular/core';
import { JobSeekerClass } from '../models/job-seeker-class';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class JobSeekerServiceService {

  url = "https://localhost:44379/api/JobSeeker";
  constructor(private httpClient: HttpClient) { }

  //getProducts service call to receive all the products details from api
  GetJobSeekers():Observable<JobSeekerClass[]>{
    return this.httpClient.get<JobSeekerClass[]>(this.url + '/AllSeekers');
  }

  //getProductById method to receive a particular product details based on product id
  GetSeekerByUserId(userId: number):Observable<JobSeekerClass>{
    console.log("INSIDE SERVICE :",userId);
    return this.httpClient.get<JobSeekerClass>(this.url + '/GetSeekerByUserId/' + userId);
    
  }

  //addProduct method to add a new product details in database
  AddDetails(newSeeker: JobSeekerClass):Observable<JobSeekerClass>{
    //httpheaders to send request and receive response from web api
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    return this.httpClient.post<JobSeekerClass>(this.url + '/AddDetails/', newSeeker,httpOptions);
  }

  //updateProduct method to update product details in database 
  EditDetails(newSeeker: JobSeekerClass):Observable<JobSeekerClass>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
    return this.httpClient.put<JobSeekerClass>(this.url + '/EditDetails/', newSeeker,httpOptions);
  }
}

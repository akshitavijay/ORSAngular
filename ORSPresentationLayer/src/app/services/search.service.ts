import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public _url = 'https://localhost:44379/api'
  searchBy : string;
  search : string;

  //Constructor
  constructor(private http: HttpClient) { }

  //Get method to receive Job Details as per the search
  getJobDetails(value1:string, value2:string) : Observable<Job[]>{
    console.log(value1,value1);
    return this.http.get<Job[]>("https://localhost:44379/api/Search?searchBy="+value1+"&search="+value2);
  }

  //Get Method to receive all the Job Details
  getAllJobs()
  {
    return this.http.get<Job[]>("https://localhost:44379/api/Search?searchBy=&search="); 
  }
}

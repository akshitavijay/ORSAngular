import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../models/users';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user:Users[] = null;
  shoudDisplayList:Boolean=true;

  constructor(private router:Router, public adminService:AdminService, private route:ActivatedRoute) { }

  ngOnInit():void {
      adminService:AdminService;
      this.shoudDisplayList = this.router.url == '/admin' ? true:false;
      
      this.adminService.getUsers().subscribe((val)=>{this.user=val
          // alert(JSON.stringify(val));
          console.log(val);
          this.user = val as Users[];
          console.log("USERS :",this.user);
        },(err)=> {console.log(err)
        }
      );
  }

  updateUser(value1)
  {
    this.adminService.saveId = value1;
    this.router.navigate(['update-user/'+value1]);
  }

  isUserDeleted:boolean=false;
  deleteUser(value1)
  {
    this.adminService.deleteUser(value1).subscribe(
    (response:boolean)=>{
      
      console.log("RESPONSE : ",response);  
      this.isUserDeleted=response;

      if(this.isUserDeleted)
      {alert('User deleted');
      this.router.navigate(['admin'])
    }
      else{alert('User Not Deleted') };
    },
        //handle the error
        (error)=>{alert('User Not Deleted')
          console.log(error);}
          );
  
  }

}

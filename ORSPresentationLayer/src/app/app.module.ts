import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { EmployerComponent } from './employer/employer.component';
import { JobseekerComponent } from './jobseeker/jobseeker.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { from } from 'rxjs';
import { SearchComponent } from './search/search.component';
import { LoginGuardService } from './services/login-guard.service';
import { JobseekerDetailsComponent } from './jobseeker-details/jobseeker-details.component';
import { JobSeekerServiceService } from './services/job-seeker-service.service';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { ApplyComponent } from './apply/apply.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { JobApplicantsComponent } from './job-applicants/job-applicants.component';
import { JobComponent } from './job/job.component';
import { JobInsertUpdateComponent } from './job/job-insert-update/job-insert-update.component';
import { JobListComponent } from './job/job-list/job-list.component';


//setting all the routes for our app

const appRoutes : Routes = [
  //each Route is just an JS object

  { path : 'home', component: HomeComponent},   

  { path : 'search', component: SearchComponent}, 

  { path : 'about', component: AboutComponent}, 

  { path : 'contact', component: ContactComponent},  
  
  { path : 'login', component: LoginComponent,canActivate:[LoginGuardService]},   

  { path : 'register', component: UserRegisterComponent,canActivate:[LoginGuardService]},   
  
  { path : 'jobseeker/:id', component: JobseekerComponent,canActivate:[AuthGuardService]},   

  { path : 'jobseeker-details/:id', component: JobseekerDetailsComponent,canActivate:[AuthGuardService]},   
  
  { path : 'apply/:jobId', component: ApplyComponent,canActivate:[AuthGuardService]},   
 
  { path : 'applied-jobs/:jobSeekerId', component: AppliedJobsComponent,canActivate:[AuthGuardService]},   

  { path : 'job-applicants/:jobId', component: JobApplicantsComponent,canActivate:[AuthGuardService]},   

  
  { path : 'job', component: JobComponent,canActivate:[AuthGuardService]},   
  
  {path: "admin", component: AdminComponent,canActivate:[AuthGuardService]},

  {path: "update-user/:id", component: UpdateUserComponent,canActivate:[AuthGuardService]},
  
    //Redirecting and Wildcard Routes
    {path : 'not-found', component:PageNotFoundComponent},

    { path : '**', redirectTo : '/not-found'}

  
];


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AdminComponent,
    LoginComponent,
    EmployerComponent,
    JobseekerComponent,
    NavbarComponent,
    FooterComponent,
    UserRegisterComponent,
    HomeComponent,
    PageNotFoundComponent,
    SearchComponent,
    JobseekerDetailsComponent,
    AboutComponent,
    ContactComponent,
    UpdateUserComponent,
    ApplyComponent,
    AppliedJobsComponent,
    JobApplicantsComponent,
    JobComponent,
    JobInsertUpdateComponent,
    JobListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:1000,
      progressBar:true,
      progressAnimation:'increasing',
      preventDuplicates:true
    }),
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuardService,LoginGuardService,JobSeekerServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

use ORSDatabase;
Go

create table Role(roleId int primary key, roleName varchar(20))

create table Users(userId int primary key identity(101,1), password varchar(30), email varchar(50) unique, userName varchar(25), phone varchar(10), gender char(1), roleId int references Role(roleId))

create table Employer(employerId int primary key identity(500,1), userId int references Users(userId), companyName varchar(80) unique, contactDetails varchar(20))

create table JobSeeker(jobSeekerId int primary key identity(1001,1), userId int references Users(userId), address varchar(100), experience int, qualification varchar(40), profession varchar(40), skillSet varchar(40), resume varchar(40))

create table Job(jobId int primary key identity(201,1), employerId int references Employer(employerId), companyName varchar(80) references Employer(companyName), jobCategory varchar(30), jobTitle varchar(40), requiredSkills varchar(100), currentOpenings int, joiningDate date, location varchar(30), designation varchar(30), experience int, qualification varchar(40))

create table Applicant(applicationNo int primary key identity(301,1), jobId int references Job(jobId), jobSeekerId int references JobSeeker(jobSeekerId)) 
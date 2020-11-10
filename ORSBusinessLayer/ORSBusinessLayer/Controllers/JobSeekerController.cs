using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ORSBusinessLayer.Models;


namespace ORSBusinessLayer.Controllers
{
    [RoutePrefix("Api/JobSeeker")]
    public class JobSeekerController : ApiController
    {

        ORSDatabaseEntities entities = new ORSDatabaseEntities();
        //JobSeekerController objJobSeekerController = new JobSeekerController();
        public JobSeekerController()
        {
            entities.Configuration.ProxyCreationEnabled = false;
        }

        //Accept get request
        [HttpGet]
        [Route("AllSeekers")]
        public List<JobSeeker> GetJobSeekers()
        {
            try
            {
                //to delay the loading of related data
                //to increase efficiency
                entities.Configuration.LazyLoadingEnabled = false;
                //entities.Configuration.ProxyCreationEnabled = false;
                List<JobSeeker> newSeeker = entities.JobSeekers.ToList();

                return newSeeker;
            }
            catch (Exception)
            {
                throw;
            }
        }

        //Accept get request based on parameter product id
        [HttpGet]
        [Route("GetSeekerByUserId/{userId}")]
        public IHttpActionResult GetSeekerByUserId(int userId)
        {
            try
            {
                entities.Configuration.LazyLoadingEnabled = false;
                JobSeeker jobSeeker = entities.JobSeekers.Where(x => x.userId == userId).FirstOrDefault();
                if (jobSeeker != null)
                {
                    return Ok(jobSeeker);
                }
                else
                {
                    JobSeeker newSeeker = new JobSeeker()
                    {
                        
                        userId = userId,
                        address = "",
                        experience = null,
                        profession = "",
                        skillSet = "",
                        resume = "",
                        qualification = ""
                    };

                    return Ok(newSeeker);
                }
                
            }
            catch (Exception)
            {
                throw;
            }
        }

        //Accept post request
        [HttpPost]
        [Route("AddDetails")]
        public IHttpActionResult AddDetails(JobSeeker newSeeker)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    JobSeeker objSeeker = entities.JobSeekers.Where(x => x.userId == newSeeker.userId).FirstOrDefault();
                    if (objSeeker == null)
                    {
                        entities.JobSeekers.Add(newSeeker);
                        entities.SaveChanges();
                        return Ok(newSeeker);
                    }
                    else
                    {
                        objSeeker.address = newSeeker.address;
                        objSeeker.experience = newSeeker.experience;
                        objSeeker.qualification = newSeeker.qualification;
                        objSeeker.profession = newSeeker.profession;
                        objSeeker.skillSet = newSeeker.skillSet;
                        objSeeker.resume = newSeeker.resume;
                        entities.SaveChanges();
                        return Ok(objSeeker);
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
        

       
        
    }
}

using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ORSBusinessLayer.Models;

namespace ORSBusinessLayer.Controllers
{
    [RoutePrefix("Api/Applicants")]
    public class ApplicantsController : ApiController
    {
        private ORSDatabaseEntities db = new ORSDatabaseEntities();

        // GET: api/Applicants
        public IQueryable<Applicant> GetApplicants()
        {
            return db.Applicants;
        }

        // GET: api/Applicants/5
        [ResponseType(typeof(Applicant))]
        public IHttpActionResult GetApplicant(int id)
        {
            try
            {
                Applicant applicant = db.Applicants.Find(id);
                if (applicant == null)
                {
                    return NotFound();
                }
                return Ok(applicant);
            }

            catch (Exception)
            {
                throw;
            }



        }

        /// <summary>
        /// method to get jobSeeker id by userId
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetJobSeekerId/{userId}")]
        public int GetJobSeekerId(int userId)
        {
            try
            {
                JobSeeker jobSeeker = new JobSeeker();
                jobSeeker = db.JobSeekers.Where(x => x.userId == userId).FirstOrDefault();
                return jobSeeker.jobSeekerId;
            }
            catch (Exception)
            {
                throw;
            }


        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="jobSeekerId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetJobDetails/{jobSeekerId}")]

        public List<Job> GetJobDetails(int jobSeekerId)
        {
            try
            {
                db.Configuration.LazyLoadingEnabled = false;
                db.Configuration.ProxyCreationEnabled = false;
                List<Applicant> objApplicant = new List<Applicant>();
                List<Job> jobList = new List<Job>();
                Job job = new Job();


                objApplicant = (from obj in db.Applicants
                                where obj.jobSeekerId == jobSeekerId
                                select obj).ToList();


                foreach (Applicant applicant in objApplicant)
                {
                    int temp = Convert.ToInt32(applicant.jobId);
                    job = db.Jobs.Find(temp);
                    jobList.Add(job);
                }

                return jobList;

            }
            catch (Exception)
            {
                throw;
            }

        }

        /// <summary>
        /// method to get job applicants by job id
        /// </summary>
        /// <param name="jobId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("JobApplicants/{jobId}")]

        public List<JobSeeker> JobApplicants(int jobId)
        {
            try
            {
                db.Configuration.LazyLoadingEnabled = false;
                db.Configuration.ProxyCreationEnabled = false;

                List<Applicant> objApplicant = new List<Applicant>();
                List<JobSeeker> jobSeekerList = new List<JobSeeker>();
                JobSeeker jobSeeker = new JobSeeker();


                objApplicant = (from obj in db.Applicants
                                where obj.jobId == jobId
                                select obj).ToList();


                foreach (Applicant applicant in objApplicant)
                {
                    int temp = Convert.ToInt32(applicant.jobSeekerId);
                    jobSeeker = db.JobSeekers.Find(temp);
                    jobSeekerList.Add(jobSeeker);
                }

                return jobSeekerList;
            }
            catch (Exception)
            {
                throw;
            }

        }

        /// <summary>
        /// method to get Job by job Id
        /// </summary>
        /// <param name="jobid"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetJobById/{jobId}")]
        public IHttpActionResult GetJobById(int jobid)
        {
            try
            {
                // db.Configuration.LazyLoadingEnabled = false;
                Job objJob = db.Jobs.Where(x => x.jobId == jobid).FirstOrDefault();
                if (objJob == null)
                {
                    return NotFound();
                }
                return Ok(objJob);
            }
            catch (Exception)
            {
                throw;
            }
        }




        // PUT: api/Applicants/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutApplicant(int id, Applicant applicant)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != applicant.applicationNo)
            {
                return BadRequest();
            }

            db.Entry(applicant).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplicantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Applicants
        [ResponseType(typeof(Applicant))]
        public IHttpActionResult PostApplicant(Applicant applicant)
        {
            //To check if the applicant object is null
            if (applicant == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Applicant checkValidApplicant = new Applicant();
            //To check if user has already applied for the job
            checkValidApplicant = db.Applicants.Where(x => x.jobId == applicant.jobId && x.jobSeekerId == applicant.jobSeekerId).FirstOrDefault();
            if (checkValidApplicant != null)
            {
                return BadRequest("User has already Applied for the job.");
            }

            db.Applicants.Add(applicant);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = applicant.applicationNo }, applicant);
        }

        // DELETE: api/Applicants/5
        [ResponseType(typeof(Applicant))]
        public IHttpActionResult DeleteApplicant(int id)
        {
            Applicant applicant = db.Applicants.Find(id);
            if (applicant == null)
            {
                return NotFound();
            }

            db.Applicants.Remove(applicant);
            db.SaveChanges();

            return Ok(applicant);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ApplicantExists(int id)
        {
            return db.Applicants.Count(e => e.applicationNo == id) > 0;
        }
    }
}

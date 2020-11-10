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
    public class JobsController : ApiController
    {
        private ORSDatabaseEntities db = new ORSDatabaseEntities();

        // GET: api/Jobs
        public IQueryable<Job> GetJobs()
        {
            return db.Jobs;
        }

        /// <summary>
        /// method to find a job by job ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET: api/Jobs/5
        [ResponseType(typeof(Job))]
        public IHttpActionResult GetJob(int id)
        {
            try
            {
                Job job = db.Jobs.Find(id);
                if (job == null)
                {
                    return NotFound();
                }

                return Ok(job);
            }
            catch (Exception)
            {
                throw;
            }

        }


        // PUT: api/Job/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutJob(int id, Job job)
        {


            if (id != job.jobId)
            {
                return BadRequest();
            }

            db.Entry(job).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobExists(id))
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


        // POST: api/Job
        [ResponseType(typeof(Job))]
        public IHttpActionResult PostJob(Job job)
        {

            db.Jobs.Add(job);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = job.jobId }, job);
        }


        // DELETE: api/Job/5
        [ResponseType(typeof(Job))]
        public IHttpActionResult DeleteJob(int id)
        {
            Job job = db.Jobs.Find(id);
            if (job == null)
            {
                return NotFound();
            }

            db.Jobs.Remove(job);
            db.SaveChanges();

            return Ok(job);
        }






        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool JobExists(int id)
        {
            return db.Jobs.Count(e => e.jobId == id) > 0;
        }
    }
}

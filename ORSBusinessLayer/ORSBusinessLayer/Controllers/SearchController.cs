using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ORSBusinessLayer.Models;

namespace ORSBusinessLayer.Controllers
{
    public class SearchController : ApiController
    {
        ORSDatabaseEntities db = new ORSDatabaseEntities();

        //Get Method for search
        public IEnumerable<Job> GetSearch(string searchBy, string search)
        {
            if (searchBy == "Job Category")
            {
                return db.Jobs.Where(x => x.jobCategory.StartsWith(search) || search == null).ToList();
            }
            if (searchBy == "Skill Set")
            {
                return db.Jobs.Where(x => x.requiredSkills.StartsWith(search) || search == null);
            }

            if (searchBy == "Designation")
            {
                return db.Jobs.Where(x => x.designation.StartsWith(search) || search == null);
            }
            else
            {
                return db.Jobs.Where(x => x.location.StartsWith(search) || search == null);
            }
        }


        //Used to dispose the database object
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data;
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
    public class UsersController : ApiController
    {/// <summary>
     /// Creating object of Entity Class , in order to make changes into collections(which result into changes in database)
     /// </summary>
        private ORSDatabaseEntities db = new ORSDatabaseEntities();


        /// <summary>
        /// Method to add a new user to the Database
        /// </summary>
        /// <param name="objUser"></param>
        /// <returns></returns>
        [HttpPost]
        [ResponseType(typeof(User))]
        public IHttpActionResult SignUp(User objUser)
        {
            //checking if user's email already exists 
            User obj = db.Users.Where(u => u.email == objUser.email).FirstOrDefault();
            if (obj != null)
            {
                //returning 409 status code , along with a error message
                return Content(HttpStatusCode.Conflict, "User Already Exists");
            }
            else
            {
                //adding new user
                db.Users.Add(new User()
                {
                    userName = objUser.userName,
                    password = objUser.password,
                    email = objUser.email,
                    gender = objUser.gender,
                    roleId = objUser.roleId,
                    phone = objUser.phone
                });
            }
            try
            {
                //saving changes to collection (which then save changes to Database)
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                //if user already exists
                if (UserExists(objUser.userId, objUser.email))
                {
                    return Content(HttpStatusCode.Conflict, "User Already Exists");
                }
                else
                {
                    throw;
                }
            }
            //success
            return CreatedAtRoute("DefaultApi", new { id = objUser.userId }, objUser);
        }




        /// <summary>
        /// Method to implement the Signin functionality
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(string))]
        [Route("api/Users/SignIn/{email}/{password}")]
        public IHttpActionResult SignIn(string email, string password)
        {
            try
            {
                //checking if user with given email and password exists in the database
                User user = db.Users.Where(u => u.email == email && u.password == password).FirstOrDefault();
                if (user == null)
                {
                    //returning 404 status code , along with a error message
                    return Content(HttpStatusCode.NotFound, "Enter Valid Credentials");
                }

                //returning 200 status code, along with the user object
                return Ok(user);
            }
            catch (Exception e)
            {
                //returning 400 status code , along with a error message
                return Content(HttpStatusCode.BadRequest, e.Message);
            }

        }



        /// <summary>
        /// Method to check if a user already exists in database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="emailId"></param>
        /// <returns></returns>
        private bool UserExists(int id, string emailId)
        {
            return db.Users.Count(e => e.userId == id || e.email == emailId) > 0;
        }

        /// <summary>
        /// Method to fetch the list of users
        /// </summary>
        /// <returns></returns>
        // GET: api/Users
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }


        /// <summary>
        /// Method to search for a particular user in the list
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        //GET: api/Users/5
        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}

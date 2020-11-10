using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ORSBusinessLayer.Models;
using ORSBusinessLayer.ExceptionLayer;

namespace ORSBusinessLayer.Controllers
{
    public class AdminController : ApiController
    {
        //private ORSDatabaseEntities db = new ORSDatabaseEntities();

        /// <summary>
        /// This method fetches data of all users from the database
        /// </summary>
        /// <returns> List of Users </returns>
        // GET: api/Admin
        [HttpGet]
        public List<User> GetUsers()
        {
            try
            {
                //establishing database connection
                using (ORSDatabaseEntities db = new ORSDatabaseEntities())
                {
                    //List of users fetched from database
                    List<User> userList = db.Users.ToList();
                    //list of user
                    return userList;
                }
            }
            catch (Exception ex)
            {
                //throws user defined exception 
                throw new UserException(ex.Message);
            }
        }

        /// <summary>
        /// This method fetches data of a users from the database with same id that was passed by the client
        /// </summary>
        /// <returns> User type </returns>
        // GET: api/Admin/5
        [ResponseType(typeof(User))]
        [HttpGet]
        public User GetUser(int? id)
        {
            try
            {
                //establishing database connection
                using (ORSDatabaseEntities db = new ORSDatabaseEntities())
                {
                    //First user with the same id that was passed
                    User user = db.Users.Where(f => f.userId == id).FirstOrDefault();

                    //returns user type data
                    return user;
                }
            }
            catch (Exception ex)
            {
                //throws user defined exception
                throw new UserException(ex.Message);
            }
        }

        /// <summary>
        /// This method updated data of a user in the database after recieving updated values from the client
        /// </summary>
        /// <returns> bool value </returns>
        // PUT: api/Admin/5
        [ResponseType(typeof(void))]
        [HttpPut]
        public bool PutUser(int? id, User user)
        {
            try
            {
                //establishing database connection
                using (ORSDatabaseEntities db = new ORSDatabaseEntities())
                {
                    //First user with the same id that was passed is fetched and updated as per data passed by the client
                    User item = db.Users.Where(f => f.userId == id).FirstOrDefault();

                    //if the user exists
                    if (item != null)
                    {
                        // updates values into the user 
                        item.password = user.password;
                        item.userName = user.userName;
                        item.email = user.email;
                        item.phone = user.phone;
                        item.gender = user.gender;

                        //saving updated values in the user 
                        db.SaveChanges();

                        return true;
                    }
                    else
                    {
                        //throws user defined exception
                        throw new UserException("User does not exist.");
                    }

                }
            }
            catch (Exception ex)
            {
                //throws user defined exception
                throw new UserException(ex.Message);
            }
        }

        //// POST: api/Admin
        //[ResponseType(typeof(User))]
        //public IHttpActionResult PostUser(User user)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Users.Add(user);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = user.userId }, user);
        //}



        /// <summary>
        /// This method delete the user from the database that has same id that was passed on by the client side
        /// </summary>
        /// <returns> bool value </returns>
        // DELETE: api/Admin/5
        [ResponseType(typeof(User))]
        [HttpDelete]
        public bool DeleteUser(int id)
        {
            try
            {
                //establishing database connection
                using (ORSDatabaseEntities db = new ORSDatabaseEntities())
                {
                    //deletes the user with specific id
                    User user = db.Users.Where(f => f.userId == id).FirstOrDefault();
                    User objUser = new User()
                    {
                        userId = user.userId,
                        password = user.password,
                        email = user.email,
                        userName = user.userName,
                        phone = user.phone,
                        gender = user.gender,
                        roleId = user.roleId
                    };
                    if (objUser != null)
                    {
                        //db.Users.Remove(user);
                        ////updates the changes in the database
                        //db.SaveChanges();

                        db.Entry(objUser).State = System.Data.Entity.EntityState.Deleted;
                        db.SaveChanges();

                        return true;
                    }

                    else
                    {
                        //throws user defined exception
                        throw new UserException("User does not exist");
                    }
                }
            }
            catch (Exception ex)
            {
                //throws user defined exception
                throw new UserException(ex.Message);
            }
        }


        /// <summary>
        /// This method takes the id input and verifies if the user exists or not
        /// </summary>
        /// <param name="id"></param>
        /// <returns>boolean value as true or false </returns>
        private bool UserExists(int id)
        {
            using (ORSDatabaseEntities db = new ORSDatabaseEntities())
                return db.Users.Count(e => e.userId == id) > 0;
        }
    }
}

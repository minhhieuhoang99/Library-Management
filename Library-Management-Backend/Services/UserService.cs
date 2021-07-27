using LibraryManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using LibraryManagement.Services;
namespace LibraryManagement.Services
{
    public class UserServices : IUserServices
    {
        LibraryContext libraryContext;
        public UserServices(LibraryContext _libraryContext)
        {
            libraryContext = _libraryContext;
        }
        public UserModel Get(int id)
        {
            var exitsingUser = libraryContext.Users.Find(id);
            return exitsingUser;
        }
        public List<UserModel> GetUsers()
        {
            if (libraryContext != null)
            {
                return libraryContext.Users.ToList();
            }
            return null;
        }
        public UserModel Add(UserModel user)
        { 
            using var trancsaction = libraryContext.Database.BeginTransaction();
            try
            {
                var newUser = new UserModel
                {
                    Username =  user.Username,
                    Password = user.Password,
                    Role = user.Role,
                    FirstName = user.FirstName,
                    LastName  = user.LastName,
                    YearOfBirth = user.YearOfBirth,
                    PhoneNumber = user.PhoneNumber,
                    Email = user.Email,
                    Gender = user.Gender,
                };

                libraryContext.Users.Add(newUser);
                libraryContext.SaveChanges();
                trancsaction.Commit();

                return newUser;
            }
            catch
            {
                throw;
            }
        }
        public UserModel Update(UserModel user)
        {
            using var trancsaction = libraryContext.Database.BeginTransaction();
            try
            {
                var existingUser = libraryContext.Users.Find(user.UserId);
                if (existingUser != null)
                {
                    existingUser.Username =  user.Username;
                    existingUser.Password = user.Password;
                    existingUser.Role = user.Role;
                    existingUser.FirstName = user.FirstName;
                    existingUser.LastName  = user.LastName;
                    existingUser.YearOfBirth = user.YearOfBirth;
                    existingUser.PhoneNumber = user.PhoneNumber;
                    existingUser.Email = user.Email;
                    existingUser.Gender = user.Gender;
                    libraryContext.SaveChanges();
                    trancsaction.Commit();

                    return existingUser;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public int Delete(int id)
        {
            using var trancsaction = libraryContext.Database.BeginTransaction();
            try
            {
                int result = 0;
            if (libraryContext != null)
            {
                var exitsingUser = libraryContext.Users.Find(id);
                if (exitsingUser != null)
                {
                    libraryContext.Users.Remove(exitsingUser);
                    result = libraryContext.SaveChanges();
                    trancsaction.Commit();
                    return result;
                }
                else
                {
                    return 0;
                }
            }
            return 0;
            }
            catch (Exception)
            {
                return 0;
            }
    }
    }
    }

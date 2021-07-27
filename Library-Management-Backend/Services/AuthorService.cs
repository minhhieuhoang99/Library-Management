using LibraryManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using LibraryManagement.Services;
namespace LibraryManagement.Services
{
    public class AuthorServices : IAuthorServices
    {
        LibraryContext libraryContext;
        public AuthorServices(LibraryContext _libraryContext)
        {
            libraryContext = _libraryContext;
        }
        public AuthorModel Get(int id)
        {
            var exitsingAuthor = libraryContext.Authorities.Find(id);
            return exitsingAuthor;
        }
        public List<AuthorModel> GetAuthorities()
        {
            if (libraryContext != null)
            {
                return libraryContext.Authorities.ToList();
            }
            return null;
        }
        public AuthorModel Add(AuthorModel author)
        { 
            using var trancsaction = libraryContext.Database.BeginTransaction();
            try
            {
                var newAuthor = new AuthorModel
                {
                    FirstName  =author.FirstName,
                    LastName = author.LastName,
                    YearOfBirth = author.YearOfBirth,
                    PhoneNumber = author.PhoneNumber,
                    Email = author.Email,
                    Gender = author.Gender,
                };

                libraryContext.Authorities.Add(newAuthor);
                libraryContext.SaveChanges();
                trancsaction.Commit();

                return newAuthor;
            }
            catch
            {
                throw;
            }
        }
        public AuthorModel Update(AuthorModel author)
        {
            using var trancsaction = libraryContext.Database.BeginTransaction();
            try
            {
                var existingAuthor = libraryContext.Authorities.Find(author.AuthorId);
                if (existingAuthor != null)
                {
                    existingAuthor.FirstName  =author.FirstName;
                    existingAuthor.LastName = author.LastName;
                    existingAuthor.YearOfBirth = author.YearOfBirth;
                    existingAuthor.PhoneNumber = author.PhoneNumber;
                    existingAuthor.Email = author.Email;
                    existingAuthor.Gender = author.Gender;
                    libraryContext.SaveChanges();
                    trancsaction.Commit();

                    return existingAuthor;
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
                var existingAuthor = libraryContext.Authorities.Find(id);
                if (existingAuthor != null)
                {
                    libraryContext.Authorities.Remove(existingAuthor);
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

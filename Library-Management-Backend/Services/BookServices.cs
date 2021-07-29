using LibraryManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using LibraryManagement.Services;
namespace LibraryManagement.Services
{
    public class BookServices : IBookServices
    {
        LibraryContext libraryContext;
        public BookServices(LibraryContext _libraryContext)
        {
            libraryContext = _libraryContext;
        }
        public BookModel Get(int id)
        {
            var existingBook = libraryContext.Books.Find(id);
            return existingBook;
        }
        public List<BookModel> GetBooks()
        {
            if (libraryContext != null)
            {
                return libraryContext.Books.ToList();
            }
            return null;
        }
        public BookModel Add(BookDTO book)
        { 
            using var trancsaction = libraryContext.Database.BeginTransaction();
            try
            {
                var newBook = new BookModel
                {
                    Description = book.Description,
                    Image = book.Image,
                    Title = book.Title,
                    CategoryId = book.CategoryId,
                    AuthorId = book.AuthorId,
                };

                libraryContext.Books.Add(newBook);
                libraryContext.SaveChanges();
                trancsaction.Commit();

                return newBook;
            }
            catch
            {
                throw;
            }
        }
        public BookModel Update(BookDTO book)
        {
            using var trancsaction = libraryContext.Database.BeginTransaction();
            try
            {
                var existingBook = libraryContext.Books.Find(book.Id);
                if (existingBook != null)
                {
                    existingBook.Description = book.Description;
                    existingBook.Image = book.Image;
                    existingBook.Title = book.Title;
                    existingBook.CategoryId = book.CategoryId;
                    existingBook.AuthorId = book.AuthorId;
                    libraryContext.Books.Update(existingBook);
                    libraryContext.SaveChanges();
                    trancsaction.Commit();
                    return existingBook;
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
                var existingBook = libraryContext.Books.Find(id);
                if (existingBook != null)
                {
                    libraryContext.Books.Remove(existingBook);
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

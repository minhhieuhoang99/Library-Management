using LibraryManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using LibraryManagement.Services;
namespace LibraryManagement.Services
{
    public class BorrowServices : IBorrowServices
    {
        LibraryContext libraryContext;
        public BorrowServices(LibraryContext _libraryContext)
        {
            libraryContext = _libraryContext;
        }
        public BorrowRequest Get(int id)
        {
            var existing = libraryContext.BorrowRequests.Find(id);
            return existing;
        }
        public List<BorrowRequest> GetBorrowRequests()
        {
            if (libraryContext != null)
            {
                return libraryContext.BorrowRequests.ToList();
            }
            return null;
        }
        public BorrowRequest Add(BorrowDTO borrow)
        { 
            using var trancsaction = libraryContext.Database.BeginTransaction();
            try
            {
                var newBorrow = new BorrowRequest
                {
                    UserId = borrow.UserId,
                    BorrowFromDate = borrow.BorrowFromDate,
                    Status = (Status)0,
                };

                libraryContext.BorrowRequests.Add(newBorrow);
                libraryContext.SaveChanges();
                trancsaction.Commit();

                return newBorrow;
            }
            catch
            {
                throw;
            }
        }
        public BorrowRequest Update(BorrowDTO borrow)
        {
            using var trancsaction = libraryContext.Database.BeginTransaction();
            try
            {
                var existing = libraryContext.BorrowRequests.Find(borrow.Id);
                if (existing != null)
                {
                    
                    existing.UserId = borrow.UserId;
                    existing.BorrowFromDate = borrow.BorrowFromDate;
                    existing.Status = borrow.Status;
                    libraryContext.BorrowRequests.Update(existing);
                    libraryContext.SaveChanges();
                    trancsaction.Commit();
                    return existing;
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
                var existing = libraryContext.BorrowRequests.Find(id);
                if (existing != null)
                {
                    libraryContext.BorrowRequests.Remove(existing);
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

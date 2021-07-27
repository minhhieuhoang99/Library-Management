using System;
using System.Collections.Generic;
using LibraryManagement.Models;
namespace LibraryManagement.Services
{
    public interface IBorrowServices
    {
        List<BorrowRequest> GetBorrowRequests();
        BorrowRequest Get(int id);
        BorrowRequest Add(BorrowDTO borrow);
        BorrowRequest Update(BorrowDTO borrow);
        int Delete(int id);
    }
}
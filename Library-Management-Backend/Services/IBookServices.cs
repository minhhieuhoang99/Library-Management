using System;
using System.Collections.Generic;
using LibraryManagement.Models;
namespace LibraryManagement.Services
{
    public interface IBookServices
    {
        List<BookModel> GetBooks();
        BookModel Get(int id);
        BookModel Add(BookDTO book);
        BookModel Update(BookDTO book);
        int Delete(int id);
    }
}
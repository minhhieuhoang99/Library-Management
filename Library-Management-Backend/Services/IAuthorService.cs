using System;
using System.Collections.Generic;
using LibraryManagement.Models;
namespace LibraryManagement.Services
{
    public interface IAuthorServices
    {
        List<AuthorModel> GetAuthorities();
        AuthorModel Get(int id);
        AuthorModel Add(AuthorModel author);
        AuthorModel Update(AuthorModel author);
        int Delete(int id);
    }
}
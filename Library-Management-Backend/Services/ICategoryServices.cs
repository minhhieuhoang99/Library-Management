using System;
using System.Collections.Generic;
using LibraryManagement.Models;
namespace LibraryManagement.Services
{
    public interface ICategoryServices
    {
        List<Category> GetCategories();
        Category Get(int id);
        Category Add(Category category);
        Category Update(Category category);
        int Delete(int id);
    }
}
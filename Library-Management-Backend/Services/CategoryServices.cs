using LibraryManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using LibraryManagement.Services;
namespace LibraryManagement.Services
{
    public class CategoryServices : ICategoryServices
    {
        LibraryContext libraryContext;
        public CategoryServices(LibraryContext _libraryContext)
        {
            libraryContext = _libraryContext;
        }
        public Category Get(int id)
        {
            var existingCategory = libraryContext.Categories.Find(id);
            return existingCategory;
        }
        public List<Category> GetCategories()
        {
            if (libraryContext != null)
            {
                return libraryContext.Categories.ToList();
            }
            return null;
        }
        public Category Add(Category category)
        { 
            using var trancsaction = libraryContext.Database.BeginTransaction();
            try
            {
                var newCategory = new Category
                {
                    Description =category.Description,
                    Image = category.Image,
                    CategoryName =category.CategoryName
                };

                libraryContext.Categories.Add(newCategory);
                libraryContext.SaveChanges();
                trancsaction.Commit();

                return newCategory;
            }
            catch
            {
                throw;
            }
        }
        public Category Update(Category category)
        {
            using var trancsaction = libraryContext.Database.BeginTransaction();
            try
            {
                var existingCategory = libraryContext.Categories.Find(category.CategoryId);
                if (existingCategory != null)
                {
                    existingCategory.Description = category.Description;
                    existingCategory.Image = category.Image;
                    existingCategory.CategoryName =category.CategoryName;
                    libraryContext.SaveChanges();
                    trancsaction.Commit();

                    return existingCategory;
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
                var existingCategory = libraryContext.Categories.Find(id);
                if (existingCategory != null)
                {
                    libraryContext.Categories.Remove(existingCategory);
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

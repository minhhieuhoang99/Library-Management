using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using LibraryManagement.Models;
using LibraryManagement.Services;
namespace LibraryManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryServices _categoryServices;
        public CategoryController(ICategoryServices categoryServices)
        {
            _categoryServices = categoryServices;
        }
        [HttpGet("/api/category")]
        public List<Category> Get()
        {
            var result = _categoryServices.GetCategories();
            return result;
        }
        [HttpGet("/api/category/{id}")]
        public Category GetById(int id)
        {
            var result = _categoryServices.Get(id);
            return result;
        }
        [HttpPost("/api/category")]
        public Category AddCategory(Category category)
        {
            return  _categoryServices.Add(category);         
        }
        [HttpPut("/api/category/{id}")]
        public Category UpdateCategory(Category category)
        {
            return  _categoryServices.Update(category);         
        }
        [HttpDelete("/api/category/{id}")]
        public IActionResult Delete(int id)
        {
            _categoryServices.Delete(id);
            return NoContent();
        }

    }
}

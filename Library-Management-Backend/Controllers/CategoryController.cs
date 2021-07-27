using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using LibraryManagement.Models;
using LibraryManagement.Services;
using System.Linq;

namespace LibraryManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryServices _categoryServices;
        private readonly IUserServices _userServices;
        public CategoryController(ICategoryServices categoryServices ,IUserServices userServices)
        {
            _categoryServices = categoryServices;
            _userServices = userServices;
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
         public IActionResult AddCategory(Category category)
        {
            int token = int.Parse(Request.Headers["Token"]);

            var user = _userServices.GetUsers().SingleOrDefault(u => u.UserId == token);
            if (user == null)
            {
                return Unauthorized();
            }
            else if (user.Role == Role.SuperUser)
            {
                 _categoryServices.Add(category);
                return Ok(category);
            }
            else
            {
                return StatusCode(403);
            }
        }

        [HttpPut("/api/category/{id}")]
        public IActionResult UpdateCategory(int id, Category category)
        {
            if (!ModelState.IsValid) return null;

            int token = int.Parse(Request.Headers["Token"]);

            var user = _userServices.GetUsers().SingleOrDefault(u => u.UserId == token);
            if (user == null)
            {
                return Unauthorized();
            }
            else if (user.Role == Role.SuperUser)
            {
                _categoryServices.Update(category);
                return Ok(category);
            }
            else
            {
                return StatusCode(403);
            }
        }
        [HttpDelete("/api/category/{id}")]
        public IActionResult Delete(int id)
        {
            int token = int.Parse(Request.Headers["Token"]);

            var user= _userServices.GetUsers().SingleOrDefault(u => u.UserId == token);
            if (user == null)
            {
                return Unauthorized();
            }
            else if (user.Role == Role.SuperUser)
            {
                _categoryServices.Delete(id);
                return Ok();
            } else
            {
                return StatusCode(403);
            }
           
        }


    }
}

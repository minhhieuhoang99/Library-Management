using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using LibraryManagement.Models;
using LibraryManagement.Services;
namespace LibraryManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorServices _authorServices;
        public AuthorController(IAuthorServices authorServices)
        {
            _authorServices = authorServices;
        }
        [HttpGet("/api/author")]
        public List<AuthorModel> Get()
        {
            var result = _authorServices.GetAuthorities();
            return result;
        }
        [HttpGet("/api/author/{id}")]
        public AuthorModel GetById(int id)
        {
            var result = _authorServices.Get(id);
            return result;
        }
        [HttpPost("/api/author")]
        public AuthorModel AddCategory(AuthorModel author)
        {
            return  _authorServices.Add(author);         
        }
        [HttpPut("/api/author/{id}")]
        public AuthorModel UpdateCategory(AuthorModel author)
        {
            return  _authorServices.Update(author);         
        }
        [HttpDelete("/api/author/{id}")]
        public IActionResult Delete(int id)
        {
            _authorServices.Delete(id);
            return NoContent();
        }

    }
}

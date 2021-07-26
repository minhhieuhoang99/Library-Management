using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using LibraryManagement.Models;
using LibraryManagement.Services;
namespace LibraryManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ILibraryServices _libraryServices;
        public ProductController(ILibraryServices libraryServices)
        {
            _libraryServices = libraryServices;
        }
        [HttpGet("/api/book")]
        public List<BookModel> Get()
        {
            var result = _libraryServices.GetBooks();
            return result;
        }
        [HttpGet("/api/book/{id}")]
        public BookModel GetById(int id)
        {
            var result = _libraryServices.Get(id);
            return result;
        }
        [HttpPost("/api/book")]
        public BookModel AddBook(BookDTO book)
        {
            return  _libraryServices.Add(book);         
        }
        [HttpPut("/api/book/{id}")]
        public BookModel UpdateBook(BookDTO book)
        {
            return  _libraryServices.Update(book);         
        }
        [HttpDelete("/api/book/{id}")]
        public IActionResult Delete(int id)
        {
            _libraryServices.Delete(id);
            return NoContent();
        }

    }
}

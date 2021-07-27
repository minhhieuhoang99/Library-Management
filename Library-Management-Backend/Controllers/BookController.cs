using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using LibraryManagement.Models;
using LibraryManagement.Services;
namespace LibraryManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly IBookServices _bookServices;
        public BookController(IBookServices bookServices)
        {
            _bookServices = bookServices;
        }
        [HttpGet("/api/book")]
        public List<BookModel> Get()
        {
            var result = _bookServices.GetBooks();
            return result;
        }
        [HttpGet("/api/book/{id}")]
        public BookModel GetById(int id)
        {
            var result = _bookServices.Get(id);
            return result;
        }
        [HttpPost("/api/book")]
        public BookModel AddBook(BookDTO book)
        {
            return  _bookServices.Add(book);         
        }
        [HttpPut("/api/book/{id}")]
        public BookModel UpdateBook(BookDTO book)
        {
            return  _bookServices.Update(book);         
        }
        [HttpDelete("/api/book/{id}")]
        public IActionResult Delete(int id)
        {
            _bookServices.Delete(id);
            return NoContent();
        }

    }
}

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
    public class BookController : ControllerBase
    {
        private readonly IBookServices _bookServices;
        private readonly IUserServices _userServices;
        public BookController(IBookServices bookServices, IUserServices userServices)
        {
            _bookServices = bookServices;
            _userServices = userServices;
        }
        [HttpGet("/api/books")]
        public IActionResult Get()
        {
            var books = _bookServices.GetBooks();
            if (books != null)
            {
                return Ok(books);
            }
            return BadRequest("ĐÃ XẢY RA LỖI !!!");

        }
        [HttpGet("/api/book/{id}")]
        public IActionResult GetById(int id)
        {
            var book = _bookServices.Get(id);
            if (book != null)
            {
                return Ok(book);
            }
            return BadRequest("KHÔNG TÌM THẤY SÁCH VỚI ID LÀ :" + id);
        }

        // [HttpGet("/api/borrowBooks")]
        // public IActionResult GetListBookOfBorrowRequest(int[] listBookId)
        // {
        //     List<string> borrowBooks = new List<string>();
        //     foreach (var bookId in listBookId)
        //     {
        //         var book = _bookServices.GetBooks().SingleOrDefault(b => b.BookId == bookId);
        //         if (book != null)
        //         {
        //             borrowBooks.Add(book.Title);
        //         }
        //     }
        //     return Ok(borrowBooks);
        // }

        [HttpDelete("/api/book/{id}")]
        public IActionResult Delete(int id)
        {
            string token = Request.Headers["Token"];

            if (token != null)
            {
                var user = _userServices.GetUsers().SingleOrDefault(u => u.UserId == int.Parse(token));
                if (user == null)
                {
                    return Unauthorized();
                }
                else if (user.Role == Role.SuperUser)
                {
                    var book = _bookServices.Get(id);
                    if (book != null)
                    {
                        _bookServices.Delete(id);
                        return Ok(book);
                    }
                    return BadRequest("Khong tim thay book co id:" + id);
                }
                else
                {
                    return StatusCode(403);
                }
            }
            else
            {
                return Unauthorized();
            }
        }
        [HttpPost("/api/book")]
        public IActionResult Add(BookDTO book)
        {
            if (!ModelState.IsValid) return BadRequest("Co loi xay ra!");

            string token = Request.Headers["Token"];
            // string token = "1";
            if (token == null)
            {
                return Unauthorized();
            }
            else
            {
                var user = _userServices.GetUsers().SingleOrDefault(u => u.UserId == int.Parse(token));
                if (user.Role == Role.SuperUser)
                {
                    if (book != null)
                    {
                        _bookServices.Add(book);
                        return Ok(book);
                    }
                    return BadRequest("Co loi xay ra!");
                }
                else
                {
                    return StatusCode(403);
                }
            }
        }

        [HttpPut("/api/book/{id}")]
        public IActionResult Update(BookDTO book)
        {
            if (!ModelState.IsValid) return BadRequest("Co loi xay ra!");

            // string token = Request.Headers["Token"];
            string token = "1";
            if (token != null)
            {
                var user = _userServices.GetUsers().SingleOrDefault(u => u.UserId == int.Parse(token));
                if (user == null)
                {
                    return Unauthorized();
                }
                else if (user.Role == Role.SuperUser)
                {
                    if (book != null)
                    {
                        _bookServices.Update(book);
                        return Ok(book);
                    }

                    return BadRequest("Khong tim thay book co id la " + book.Id);
                }
                else
                {
                    return StatusCode(403);
                }
            }
            else
            {
                return Unauthorized();
            }

        }

    }
}

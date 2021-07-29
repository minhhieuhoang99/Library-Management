using LibraryManagement.Models;
using LibraryManagement.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace LibraryManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BorrowController : ControllerBase
    {
        LibraryContext _libraryContext;
        private readonly IBorrowServices _borrowServices;
        private readonly IUserServices _userServices;
        public BorrowController(IBorrowServices borrowServices, IUserServices userServices ,LibraryContext libraryContext ) 
        {
            _borrowServices = borrowServices;
            _userServices = userServices;
            _libraryContext = libraryContext;
        }

        [HttpGet("/api/borrow")]
        public IActionResult GetBorrowRequests()
        {
            if (!ModelState.IsValid) return BadRequest("Co loi xay ra!");

            // string token = Request.Headers["Token"];
            string token = "1";
            if (token == null) return Unauthorized();

            var user = _userServices.GetUsers().SingleOrDefault(u => u.UserId == int.Parse(token));

            if (user == null) return Unauthorized();

            if (user.Role == Role.User) return StatusCode(403);

            var borrowRequests = _borrowServices.GetBorrowRequests();

            if (borrowRequests != null)
            {
                return Ok(borrowRequests);
            }

            return BadRequest("Đã xảy ra lỗi!");
        }
        
        [HttpGet("/api/borrowBy/{userId}")]
        public IActionResult GetUserId(int userId)
        {
            var result = _borrowServices.GetBorrowRequests().Where(br=>br.UserId == userId);

            return Ok(result);
        }

        [HttpGet("/api/borrow/{borrowRequestId}")]
        public IActionResult GetBorrowRequestById(int borrowRequestId)
        {
            if (!ModelState.IsValid) return BadRequest("Đã xảy ra lỗi!");

            // string token = Request.Headers["Token"];
            string token = "1";
            if (token == null) return Unauthorized();

            var user = _userServices.GetUsers().SingleOrDefault(u => u.UserId == int.Parse(token));

            if (user == null) return Unauthorized();

            if (user.Role == Role.User) return StatusCode(403);

            var borrowRequests = _borrowServices.GetBorrowRequests()
                .AsQueryable()
                .Include(b => b.BorrowRequestDetails)
                .ThenInclude(br => br.Book)
                .ThenInclude(b => b.Category)
                .Where(b => b.BorrowRequestId == borrowRequestId)
                .ToList();

            if (borrowRequests != null)
            {
                return Ok(borrowRequests);
            }

            return BadRequest("Đã xảy ra lỗi!");
        }

        [HttpPost("/api/borrow/{userId}")]
        public IActionResult Add( BorrowDTO borrow)
        {
            var checkBorrowInMonth = _borrowServices.GetBorrowRequests().Count(br => br.UserId == borrow.UserId && br.BorrowFromDate.Month == DateTime.Now.Month);

            if (checkBorrowInMonth < 3)
            {
                if (_libraryContext.BorrowRequestDetails.Count(br => br.BorrowRequestId == borrow.Id) <= 5)
                {
                    _borrowServices.Add(borrow);
                    return Ok(borrow);
                }
                return BadRequest("Ban ko the muon 5 cuon sach 1 luc");
            }
            return BadRequest("Ban ko the muon qua 3 lan trong 1 thang");
        }

        [HttpPut("/api/borrow/approve/{borrowRequestId}")]
        public IActionResult ApproveBorrowRequest(int borrowRequestId)
        {
            if (!ModelState.IsValid) return BadRequest("Co loi xay ra!");

            string token = Request.Headers["Token"];
            // string token = "1";
            if (token == null) return Unauthorized();

            var user = _userServices.GetUsers().SingleOrDefault(u => u.UserId == int.Parse(token));

            if (user == null) return Unauthorized();

            if (user.Role == Role.User) return StatusCode(403);

            var borrowRequest = _borrowServices.Get(borrowRequestId);

            if (borrowRequest != null)
            {
                borrowRequest.Status = (Status)1;
                var newBorrow = new BorrowDTO
                {
                    Id = borrowRequest.BorrowRequestId,
                    UserId = borrowRequest.UserId,
                    BorrowFromDate = borrowRequest.BorrowFromDate,
                    Status = borrowRequest.Status,
                };
                _borrowServices.Update(newBorrow);
                return Ok(borrowRequest);
            }

            return BadRequest("Hiện không có sách nào có id " + borrowRequestId!);
        }

        [HttpPut("/api/borrow/reject/{borrowRequestId}")]
        public IActionResult RejectBorrowRequest(int borrowRequestId)
        {
            if (!ModelState.IsValid) return BadRequest("Co loi xay ra!");

            string token = Request.Headers["Token"];
            // string token = "1";
            if (token == null) return Unauthorized();

            var user = _userServices.GetUsers().SingleOrDefault(u => u.UserId == int.Parse(token));

            if (user == null) return Unauthorized();

            if (user.Role == Role.User) return StatusCode(403);


            var borrowRequest = _borrowServices.Get(borrowRequestId);

            if (borrowRequest != null)
            {
                borrowRequest.Status = (Status)2;
                var newBorrow = new BorrowDTO
                {
                    Id = borrowRequest.BorrowRequestId,
                    UserId = borrowRequest.UserId,
                    BorrowFromDate = borrowRequest.BorrowFromDate,
                    Status = borrowRequest.Status,
                };
                _borrowServices.Update(newBorrow);
                return Ok(borrowRequest);
            }

            return BadRequest("Khong tim thay book co id la " + borrowRequestId);
        }
    }
}
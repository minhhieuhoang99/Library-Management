
using LibraryManagement.Models;
using LibraryManagement.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LibraryManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userServices;
        public UserController(IUserServices userServices)
        {
            _userServices = userServices;
        }
        [HttpPost("login")]
        public IActionResult Login (UserModel user)
        {
            var databaseUser = _userServices.GetUsers().SingleOrDefault(u => u.Username == user.Username && u.Password == user.Password);

            if (databaseUser != null)
            {
                return Ok(databaseUser);
            }

            return BadRequest("Tên đăng nhập hoặc mật khẩu không chính xác vui vòng nhập lại");
        }

        //[HttpPost("logout")]
        //public async Task<IActionResult> LogoutAsync(User user)
        //{
        //    return Ok("Logout thanh cong");
        //}

        [HttpGet("")]
        public IActionResult GetAll()
        {
            var users = _userServices.GetUsers().ToList();

            if (users != null)
            {
                return Ok(users);
            }
            return BadRequest("Co loi xay ra!");
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = _userServices.Get(id);
            if (user != null)
            {
                return Ok(user);
            }
            return BadRequest("Không tìm thấy người dùng có id:" + id);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = _userServices.Get(id);
            if (user != null)
            {
                _userServices.Delete(id);
                return Ok();
            }
            return BadRequest("Khong tim thay book co id:" + id);
        }

        [HttpPost("register")]
        public IActionResult Register(UserModel user)
        {
            if (!ModelState.IsValid) return BadRequest("Co loi xay ra!");

            if (user != null)
            {
                user.Role = (Role)1;
                _userServices.Add(user);
                return Ok(user);
            }
            return BadRequest("Co loi xay ra!");
        }

        [HttpPut("{id}")]
        public IActionResult Update(UserModel user)
        {
            if (!ModelState.IsValid) return BadRequest("Co loi xay ra!");

            if (user != null)
            {
                _userServices.Update(user);
                return Ok(user);
            }

            return BadRequest("Khong tim thay book co id la " + user.UserId!);
        }

    }
}

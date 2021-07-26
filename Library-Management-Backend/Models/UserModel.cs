using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LibraryManagement.Models;
namespace LibraryManagement.Models
{
    [Table("User")]
    public class UserModel 
    {
        [Key]
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; } 
        public int YearOfBirth { get; set; }
        public int PhoneNumber { get; set; }
        public string Email { get; set;}
        public string Gender { get; set;}
        public ICollection<BorrowRequest> BorrowRequests { get; set; } 
    }
}
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LibraryManagement.Models;
namespace LibraryManagement.Models
{
    [Table("Author")]
    public class AuthorModel
    {
        [Key]
        public int AuthorId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; } 
        public int YearOfBirth { get; set; }
        public int PhoneNumber { get; set; }
        public string Email { get; set;}
        public string Gender { get; set;}
    }
}
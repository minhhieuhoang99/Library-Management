using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LibraryManagement.Models;

namespace LibraryManagement.Models{
    [Table("Category")]
    public class Category 
    {
        [Key]
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string CategoryName {get;set;}
        public ICollection<BookModel> Book{get;set;}
    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagement.Models
{
    [Table("Book")]
    public class BookModel  
    {
        [Key]
        public int BookId { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public AuthorModel Author { get; set; }
        public int CategoryId { get; set; }
        public Status Status { get; set; }
        public Category Category { get; set; }
        public virtual ICollection<BorrowRequestDetail> BorrowRequestDetails { get; set; }
    }
}
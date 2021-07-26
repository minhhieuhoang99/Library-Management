using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryManagement.Models
{
    [Table("Borrow Request Detail")]
    public class BorrowRequestDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BorrowRequestId { get; set; }
        public int BookId { get; set; }
        public BookModel Book { get; set; }
        public BorrowRequest BorrowRequest { get; set; } 

    }
}
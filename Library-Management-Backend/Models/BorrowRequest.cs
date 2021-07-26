using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryManagement.Models
{
    [Table("Borrow Request")]
    public class BorrowRequest 
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BorrowRequestId { get; set; }
        public int UserId { get; set; }
        public DateTime BorrowFromDate { get; set; }
        public Status Status { get; set; }
        public UserModel User { get; set; }
        public ICollection<BorrowRequestDetail> BorrowRequestDetails { get; set; }
    }
}
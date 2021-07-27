using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagement.Models
{
    public class BorrowDTO 
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime BorrowFromDate { get; set; }
        public Status Status { get; set; }

    }
}
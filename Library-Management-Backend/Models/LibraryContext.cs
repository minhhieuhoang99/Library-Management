using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
namespace LibraryManagement.Models
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions options) : base(options) { }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<BookModel> Books { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<AuthorModel> Authorities  { get; set; }
        public DbSet<BorrowRequest> BorrowRequests { get; set; }
        public DbSet<BorrowRequestDetail> BorrowRequestDetails { get; set; }
    }
}
using Microsoft.EntityFrameworkCore;
using OnlineBookStore.Model;

namespace OnlineBookStore.Context
{
    public class BookStoreDbContext : DbContext
    {
        public BookStoreDbContext()
        { }
        public BookStoreDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Books> books { get; set; }

        public DbSet<Order> orders { get; set; }

        public DbSet<User> users { get; set; }

    }
}

using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;


namespace CrudApp.Models
{

    public class AppDbContext : DbContext
    {
        public DbSet<Student> Students { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Configure your database connection here
            optionsBuilder.UseSqlServer("Server=localhost\\MSSQLSERVER01;Database=StdDb;Trusted_Connection=SSPI;Encrypt=false;TrustServerCertificate=true");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>()
                .Property(s => s.StudentId)
                .ValueGeneratedOnAdd();

            // Other configurations...
        }

    }

}

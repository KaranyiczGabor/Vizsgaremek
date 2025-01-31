using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Models
{
    public class AppDbcontext : IdentityDbContext<ApplicationUser>
    {
        public AppDbcontext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ApplicationUser> applicationUsers { get; set; } = null!;   

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string conn = "Server=localhost;Port=3306;Database=quizdb;user=root;password=";

                optionsBuilder.UseMySQL(conn);
            }
        }

    }
}


using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Models;

public partial class QuizdbContext : IdentityDbContext<ApplicationUser>
{
    public QuizdbContext()
    {
    }

    public QuizdbContext(DbContextOptions<QuizdbContext> options)
        : base(options)
    {
    }

    public DbSet<ApplicationUser> applicationUser{ get; set; }
    public virtual DbSet<Answer> Answers { get; set; }

    public virtual DbSet<Attempt> Attempts { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

  
}

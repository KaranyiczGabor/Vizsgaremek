using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Models
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; } = null!;
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Attempt> Attempts { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Ensure Identity tables are set up

            modelBuilder.Entity<Answer>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");
                entity.ToTable("answers");
                entity.HasIndex(e => e.QuestionId, "question_id");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.AnswerText).HasMaxLength(60).HasColumnName("answer_text");
                entity.Property(e => e.Correct).HasColumnName("correct");
                entity.Property(e => e.QuestionId).HasColumnName("question_id");
                entity.HasOne(d => d.Question).WithMany(p => p.Answers)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("answers_ibfk_1");
            });

            modelBuilder.Entity<Attempt>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");
                entity.ToTable("attempts");
                entity.HasIndex(e => e.Uid, "uid");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Score).HasColumnType("int(11)").HasColumnName("score");
                entity.Property(e => e.Time).HasColumnType("datetime").HasColumnName("time");
                entity.Property(e => e.Uid).HasColumnName("uid");
                entity.HasOne(d => d.UidNavigation).WithMany(p => p.Attempts)
                    .HasForeignKey(d => d.Uid)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("attempts_ibfk_1");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");
                entity.ToTable("questions");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Category).HasMaxLength(50).HasColumnName("category");
                entity.Property(e => e.Difficulty).HasColumnType("int(32)").HasColumnName("difficulty");
                entity.Property(e => e.Question1).HasMaxLength(100).HasColumnName("question");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");
                entity.ToTable("user");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Email).HasMaxLength(50).HasColumnName("email");
                entity.Property(e => e.Name).HasMaxLength(50).HasColumnName("name");
            });
        }
    }
}

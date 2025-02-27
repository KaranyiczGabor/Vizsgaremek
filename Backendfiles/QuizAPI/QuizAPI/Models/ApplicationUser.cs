using Microsoft.AspNetCore.Identity;

namespace QuizAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FullName {  get; set; }
        public DateTime BirthDate { get; set; }

        public virtual ICollection<Attempt> Attempts { get; set; } = new List<Attempt>();
    }
}

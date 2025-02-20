using Microsoft.AspNetCore.Identity;

namespace QuizAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FullName {  get; set; }
        public DateTime BirthDate { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiry { get; set; }
    }
}

using QuizAPI.Models;

namespace QuizAPI.Services.IService
{
    public interface ITokenGenerator
    {
        string GenerateToken(ApplicationUser applicationUser, IEnumerable<string> role);
    }
}

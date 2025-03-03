using QuizAPI.Models;

namespace QuizAPI.Services.IService
{
    public interface ITokenGenerator
    {
        string GenerateToken(Aspnetuser applicationUser, IEnumerable<string> role);
    }
}
